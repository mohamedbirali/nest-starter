import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from '@bee/common/request';
import { TUserEntity } from '@bee/common/types';
import { UserRepo } from '../repo';

@Injectable()
export class UserPutToRequestGuard implements CanActivate {
  constructor(private readonly _userRepo: UserRepo) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: TUserEntity }>();
    const { params } = request;
    const { user } = params;

    const check = await this._userRepo.findUniqueById(
      +user,
      // {
      //   join: true,
      // }
    );
    request.__user = check!;

    return true;
  }
}
