import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ENUM_USER_STATUS_CODE_ERROR,
  USER_ACTIVE_META_KEY,
} from '../constants';
import { IRequestApp } from '@bee/common/request';
import { TUserEntity } from '@bee/common/types';

@Injectable()
export class UserActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(
      USER_ACTIVE_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required) {
      return true;
    }

    const { __user } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: TUserEntity }>();

    if (!required.includes(__user.is_active!)) {
      throw new BadRequestException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_ACTIVE_ERROR,
        message: 'user.error.isActiveInvalid',
      });
    }
    return true;
  }
}
