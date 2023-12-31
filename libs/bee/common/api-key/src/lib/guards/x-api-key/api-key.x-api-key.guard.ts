import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BadRequestError } from 'passport-headerapikey';
import { HelperNumberService } from '@bee/common/helper';
import { ENUM_API_KEY_STATUS_CODE_ERROR } from '../../constants/api-key.status-code.constant';

@Injectable()
export class ApiKeyXApiKeyGuard extends AuthGuard('api-key') {
  constructor(private readonly helperNumberService: HelperNumberService) {
    super();
  }

  override canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  override handleRequest<IApiKeyPayload = any>(
    err: Record<string, any>,
    apiKey: IApiKeyPayload,
    info: Error | string,
  ): IApiKeyPayload {
    if (err || !apiKey) {
      if (
        info instanceof BadRequestError &&
        info.message === 'Missing API Key'
      ) {
        throw new UnauthorizedException({
          statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NEEDED_ERROR,
          message: 'apiKey.error.keyNeeded',
        });
      } else if (err) {
        const statusCode: number = this.helperNumberService.create(
          err['message'] as string,
        );

        if (
          statusCode === ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NOT_FOUND_ERROR
        ) {
          throw new ForbiddenException({
            statusCode,
            message: 'apiKey.error.notFound',
          });
        } else if (
          statusCode === ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_IS_ACTIVE_ERROR
        ) {
          throw new ForbiddenException({
            statusCode,
            message: 'apiKey.error.inactive',
          });
        } else if (
          statusCode ===
          ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NOT_ACTIVE_YET_ERROR
        ) {
          throw new ForbiddenException({
            statusCode,
            message: 'apiKey.error.notActiveYet',
          });
        } else if (
          statusCode === ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_EXPIRED_ERROR
        ) {
          throw new ForbiddenException({
            statusCode,
            message: 'apiKey.error.expired',
          });
        }
      }

      throw new UnauthorizedException({
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_INVALID_ERROR,
        message: 'apiKey.error.invalid',
      });
    }

    return apiKey;
  }
}
