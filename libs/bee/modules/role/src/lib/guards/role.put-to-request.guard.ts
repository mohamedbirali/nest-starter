import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { IRequestApp } from '@bee/common/request'; ///interfaces/request.interface';
// import { RoleDoc } from '../repository/entities/role.entity';
// import { RoleService } from '../services/role.service';

@Injectable()
export class RolePutToRequestGuard implements CanActivate {
  // constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const { role } = params;

    // const check = await this.roleService.findOneById(role, {
    //   join: true,
    // });
    // request.__role = check;

    return true;
  }
}
