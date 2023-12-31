import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyRepo } from '../repo';
import { IRequestApp } from '@bee/common/request';
import { TApiKeyEntity } from '@bee/common/types';

@Injectable()
export class ApiKeyPutToRequestGuard implements CanActivate {
  constructor(private readonly _apiKeyRepo: ApiKeyRepo) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<IRequestApp & { __apiKey: TApiKeyEntity }>();
    const { apiKey } = request;
    const check = await this._apiKeyRepo.findUniqueById(+apiKey['id']);
    request.__apiKey = check;
    return true;
  }
}
