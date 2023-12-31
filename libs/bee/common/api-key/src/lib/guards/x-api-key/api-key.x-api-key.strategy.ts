import { HelperDateService } from '@bee/common/helper';
import { IRequestApp } from '@bee/common/request';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { ENUM_API_KEY_STATUS_CODE_ERROR } from '../../constants/api-key.status-code.constant';
import { ApiKeyRepo } from '../../repo';
import { TApiKeyEntity } from '@bee/common/types';
import { ApiKeyService } from '../../services';

@Injectable()
export class ApiKeyXApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  constructor(
    private readonly apiKeyRepo: ApiKeyRepo,
    private readonly apiKeyService: ApiKeyService,
    private readonly helperDateService: HelperDateService,
  ) {
    super(
      { header: 'X-API-KEY', prefix: '' },
      true,
      async (
        apiKey: string,
        verified: (
          error: Error,
          user?: Record<string, any>,
          info?: string | number,
        ) => Promise<void>,
        req: IRequestApp,
      ) => this.validate(apiKey, verified, req),
    );
  }

  async validate(
    apiKey: string,
    verified: (
      error: Error,
      user?: TApiKeyEntity,
      info?: string | number,
    ) => Promise<void>,
    req: IRequestApp,
  ): Promise<void> {
    const xApiKey: string[] = apiKey.split(':');
    if (xApiKey.length !== 2) {
      verified(
        new Error(`${ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_INVALID_ERROR}`),
        null,
        null,
      );

      return;
    }

    const key = xApiKey[0];
    const secret = xApiKey[1];
    const today = this.helperDateService.create();
    const authApi = await this.apiKeyRepo.findUniqueByActiveKey(key);

    if (!authApi) {
      verified(
        new Error(`${ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NOT_FOUND_ERROR}`),
        null,
        null,
      );

      return;
    } else if (!authApi.is_active) {
      verified(
        new Error(`${ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_IS_ACTIVE_ERROR}`),
        null,
        null,
      );

      return;
    } else if (authApi.start_at && authApi.end_at) {
      if (today < authApi.start_at) {
        verified(
          new Error(
            `${ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_NOT_ACTIVE_YET_ERROR}`,
          ),
          null,
          null,
        );
      } else if (today > authApi.end_at) {
        verified(
          new Error(`${ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_EXPIRED_ERROR}`),
          null,
          null,
        );
      }
    }

    const hashed: string = await this.apiKeyService.createHashApiKey(
      key,
      secret,
    );
    const validateApiKey: boolean = await this.apiKeyService.validateHashApiKey(
      hashed,
      authApi.hash,
    );
    if (!validateApiKey) {
      verified(
        new Error(`${ENUM_API_KEY_STATUS_CODE_ERROR.API_KEY_INVALID_ERROR}`),
        null,
        null,
      );

      return;
    }

    req.apiKey = {
      id: `${authApi.id}`,
      key: authApi.key,
      type: authApi.type,
      name: authApi.name,
    };
    verified(null, authApi);

    return;
  }
}
