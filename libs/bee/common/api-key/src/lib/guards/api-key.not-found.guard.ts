import { IRequestApp } from '@bee/common/request';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ENUM_API_KEY_STATUS_CODE_ERROR } from '../constants/api-key.status-code.constant';
import { TApiKeyEntity } from '@bee/common/types';

@Injectable()
export class ApiKeyNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __apiKey } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __apiKey: TApiKeyEntity }>();

    if (!__apiKey) {
      throw new NotFoundException({
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NOT_FOUND_ERROR,
        message: 'apiKey.error.notFound',
      });
    }
    return true;
  }
}
