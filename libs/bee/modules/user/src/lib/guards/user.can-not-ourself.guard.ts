import { IRequestApp } from '@bee/common/request';
import { TUserEntity } from '@bee/common/types';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants';

@Injectable()
export class UserCanNotOurSelfGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __user, user } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: TUserEntity }>();

    if (__user.id === user?.user['id']) {
      throw new NotFoundException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
        message: 'user.error.notFound',
      });
    }

    return true;
  }
}
