import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepo } from '../repo/user.repo';
import { AuthService } from '@bee/common/auth';
import { HelperDateService, HelperHashService } from '@bee/common/helper';
import { ConfigService } from '@nestjs/config';
import { UserRegisterDto } from '../dtos/user.register.dto';
import { TUserEntity, TPromise } from '@bee/common/types';
import { EmailTemplateService } from '@bee/common/mailer';
import { IResponse } from '@bee/common/response';
import { UserChangePasswordDto, UserLoginDto } from '../dtos';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly _userRepo: UserRepo,
    private readonly _authService: AuthService,
    private readonly _hashService: HelperHashService,
    private readonly _dateService: HelperDateService,
    private readonly _configService: ConfigService,
    private readonly _emailTemplateService: EmailTemplateService,
  ) {}

  async register(user: UserRegisterDto): Promise<IResponse> {
    // is user exists
    const userExist = await this._userRepo.isUserExists(user);

    if (userExist)
      throw new ConflictException({
        statusCode: 5001,
        message: 'user.error.exists',
      });

    const salt = this._hashService.randomSalt(
      +this._configService.get('auth.password.saltLength'),
    );
    const password = this._hashService.bcrypt(user.password, salt);

    const userEntity = {
      ...user,
      salt,
      password,
    } as TUserEntity;
    const userCreated = await this._userRepo.create(userEntity);
    const token = await this._authService.createAccessToken(user.email);

    this._configService.get('app.env') === 'prod'
      ? await this._emailTemplateService.sendTokenActivateAccount(
          token,
          user.email,
        )
      : '';

    return {
      data: {
        email: userCreated?.email,
        username: userCreated?.username,
        token,
      },
    };
  }

  async activateAccount(token: string): Promise<IResponse> {
    const isValid = await this._authService.validateAccessToken(token);
    const at: any = await this._authService.payloadAccessToken(token);

    if (isValid) {
      await this._userRepo.update({
        email: at['data'],
        is_active: isValid,
      } as TUserEntity);
    }

    return {
      data: {
        isDone: isValid,
      },
    };
  }

  async login(user: UserLoginDto): Promise<IResponse> {
    // user exists ?
    const userExist = await this._userRepo.findByEmail(user.email);

    if (!userExist?.password)
      throw new NotFoundException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
        message: 'user.error.notFound',
      });

    if (userExist.is_blocked) {
      throw new NotFoundException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
        message: 'user.error.userBlocked',
        blockedAt: userExist.blocked_at,
      });
    }

    if (!userExist.is_active) {
      throw new NotFoundException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
        message: 'user.error.userInactive',
      });
    }

    const isPwd = this._hashService.bcryptCompare(
      user.password,
      userExist.password,
    );

    if (!isPwd) {
      await this._userRepo.update({
        ...userExist,
        password_attempt: (userExist.password_attempt ?? 0) + 1,
        is_blocked: userExist.password_attempt === 4,
        blocked_at: userExist.password_attempt === 4 ? new Date() : null,
      } as TUserEntity);

      throw new NotFoundException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
        message: 'user.error.passwordNotMatch',
      });
    }

    return {
      data: {
        email: userExist.email,
        accessToken: await this._authService.createAccessToken(userExist.email),
      },
    };
  }

  async changePassword(
    user: UserChangePasswordDto,
    email: string,
  ): Promise<IResponse> {
    const _user = await this._userRepo.findByEmail(email);

    if (_user?.password) {
      const isMatch = this._hashService.bcryptCompare(
        user.oldPassword,
        _user.password,
      );

      if (!isMatch) {
        throw new NotFoundException({
          statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
          message: 'user.error.passwordNotMatch',
        });
      }

      const salt = this._hashService.randomSalt(
        +this._configService.get('auth.password.saltLength'),
      );
      const password = this._hashService.bcrypt(user.newPassword, salt);

      await this._userRepo.update({
        email,
        salt,
        password,
      });
    }

    return {
      data: {
        isDone: !!email,
      },
    };
  }

  async resetPassword(): Promise<IResponse> {
    return {
      data: {
        created: 'done',
      },
    };
  }

  /**
   * temporary
   */
  deleteAllUsers() {
    return this._userRepo.deleteAllUsers();
  }
}
