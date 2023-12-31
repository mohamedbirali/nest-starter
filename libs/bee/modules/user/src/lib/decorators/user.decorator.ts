import { IRequestApp } from '@bee/common/request';
import { TUserEntity } from '@bee/common/types';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  USER_INACTIVE_PERMANENT_META_KEY,
  USER_BLOCKED_META_KEY,
  USER_ACTIVE_META_KEY,
} from '../constants';
import { UserPayloadPutToRequestGuard } from '../guards/payload/user.payload.put-to-request.guard';
import {
  UserNotFoundGuard,
  UserBlockedGuard,
  UserInactivePermanentGuard,
  UserActiveGuard,
} from '../guards';

export const GetUser = createParamDecorator(
  <T>(data: string, ctx: ExecutionContext): T => {
    const { user } = ctx.switchToHttp().getRequest();
    return data ? user[data] : user;
  },
);

export function UserProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(UserPayloadPutToRequestGuard, UserNotFoundGuard),
  );
}

export function UserAuthProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(UserBlockedGuard, UserInactivePermanentGuard, UserActiveGuard),
    SetMetadata(USER_INACTIVE_PERMANENT_META_KEY, [false]),
    SetMetadata(USER_BLOCKED_META_KEY, [false]),
    SetMetadata(USER_ACTIVE_META_KEY, [true]),
  );
}
