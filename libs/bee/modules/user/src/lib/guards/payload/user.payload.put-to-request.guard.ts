import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRepo } from '../../repo';
import { TUserEntity } from '@bee/common/types';
import { IRequestApp } from '@bee/common/request';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate {
  constructor(private readonly userService: UserRepo) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: TUserEntity }>();
    const { __user } = request;

    console.log(request);

    const check: TUserEntity | null = await this.userService.findUniqueById(
      __user['id'],
    );
    request.__user = check!;

    return true;
  }
}
