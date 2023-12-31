import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
  USER_INACTIVE_PERMANENT_META_KEY,
  USER_ACTIVE_META_KEY,
  USER_BLOCKED_META_KEY,
} from '../constants';
import {
  UserPutToRequestGuard,
  UserNotFoundGuard,
  UserCanNotOurSelfGuard,
  UserBlockedGuard,
  UserInactivePermanentGuard,
  UserActiveGuard,
} from '../guards';

export function UserAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserAdminDeleteGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(UserPutToRequestGuard, UserNotFoundGuard, UserCanNotOurSelfGuard),
  );
}

export function UserAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(UserPutToRequestGuard, UserNotFoundGuard, UserCanNotOurSelfGuard),
  );
}

export function UserAdminUpdateInactiveGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      UserPutToRequestGuard,
      UserNotFoundGuard,
      UserCanNotOurSelfGuard,
      UserBlockedGuard,
      UserInactivePermanentGuard,
      UserActiveGuard,
    ),
    SetMetadata(USER_INACTIVE_PERMANENT_META_KEY, [false]),
    SetMetadata(USER_ACTIVE_META_KEY, [true]),
    SetMetadata(USER_BLOCKED_META_KEY, [false]),
  );
}

export function UserAdminUpdateActiveGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      UserPutToRequestGuard,
      UserNotFoundGuard,
      UserCanNotOurSelfGuard,
      UserBlockedGuard,
      UserInactivePermanentGuard,
      UserActiveGuard,
    ),
    SetMetadata(USER_INACTIVE_PERMANENT_META_KEY, [false]),
    SetMetadata(USER_ACTIVE_META_KEY, [false]),
    SetMetadata(USER_BLOCKED_META_KEY, [false]),
  );
}

export function UserAdminUpdateBlockedGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      UserPutToRequestGuard,
      UserNotFoundGuard,
      UserCanNotOurSelfGuard,
      UserBlockedGuard,
    ),
    SetMetadata(USER_BLOCKED_META_KEY, [false]),
  );
}
