import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthJwtAccessGuard, AuthJwtRefreshGuard } from '../guards'; ///jwt-access/auth.jwt-access.guard';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ENUM_ROLE_TYPE, ROLE_TYPE_META_KEY } from '@bee/modules/role'; ///guards/payload/role.payload.type.guard';
import { RolePayloadTypeGuard } from '@bee/modules/role';

export const AuthJwtPayload = createParamDecorator(
  <T>(data: string, ctx: ExecutionContext): T => {
    const { user } = ctx.switchToHttp().getRequest();
    return data ? user[data] : user;
  },
);

export const AuthJwtToken = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const { headers } = ctx.switchToHttp().getRequest();
    const { authorization } = headers;
    const authorizations: string[] = authorization.split(' ');

    return authorizations.length >= 2 ? authorizations[1] : undefined;
  },
);

export function AuthJwtAccessProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtUserAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.USER]),
  );
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
    ]),
  );
}

export function AuthJwtRefreshProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}
