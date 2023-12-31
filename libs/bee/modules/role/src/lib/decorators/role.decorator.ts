import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { IRequestApp } from '@bee/common/request'; ///interfaces/request.interface';
// import { RoleDoc } from '../repository/entities/role.entity';

export const GetRole = createParamDecorator(
  <T>(returnPlain: boolean, ctx: ExecutionContext): T => {
    const { __role } = ctx.switchToHttp().getRequest();
    return (returnPlain ? __role.toObject() : __role) as T;
  },
);
