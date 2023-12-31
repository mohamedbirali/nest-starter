import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ENUM_USER_STATUS_CODE_ERROR,
  USER_INACTIVE_PERMANENT_META_KEY,
} from '../constants';
import { TUserEntity } from '@bee/common/types';
import { IRequestApp } from '@bee/common/request';

@Injectable()
export class UserInactivePermanentGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(
      USER_INACTIVE_PERMANENT_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required) {
      return true;
    }

    const { __user } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: TUserEntity }>();

    if (!required.includes(__user.is_inactive_permanent!)) {
      throw new BadRequestException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
        message: 'user.error.inactivePermanent',
      });
    }
    return true;
  }
}
