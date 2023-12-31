import { HelperDateService } from '@bee/common/helper';
import { IRequestApp } from '@bee/common/request';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ENUM_API_KEY_STATUS_CODE_ERROR } from '../constants/api-key.status-code.constant';
import { TApiKeyEntity } from '@bee/common/types';

@Injectable()
export class ApiKeyExpiredGuard implements CanActivate {
  constructor(private readonly helperDateService: HelperDateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __apiKey } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __apiKey: TApiKeyEntity }>();
    const today: Date = this.helperDateService.create();

    if (__apiKey.start_at && __apiKey.end_at && today > __apiKey.end_at) {
      throw new BadRequestException({
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_EXPIRED_ERROR,
        message: 'apiKey.error.expired',
      });
    }
    return true;
  }
}
