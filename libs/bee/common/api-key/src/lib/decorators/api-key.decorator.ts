import { IRequestApp } from '@bee/common/request';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { API_KEY_TYPE_META_KEY, ENUM_API_KEY_TYPE } from '../constants';
import { ApiKeyXApiKeyGuard, ApiKeyPayloadTypeGuard } from '../guards';
import { IApiKeyPayload } from '../interfaces';
import { TApiKeyEntity } from '@bee/common/types';

export const ApiKeyPayload: () => ParameterDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext): IApiKeyPayload => {
    const { apiKey } = ctx
      .switchToHttp()
      .getRequest<IRequestApp & { apiKey: IApiKeyPayload }>();
    return data ? apiKey[data] : apiKey;
  },
);

export function ApiKeyServiceProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(ApiKeyXApiKeyGuard, ApiKeyPayloadTypeGuard),
    SetMetadata(API_KEY_TYPE_META_KEY, [ENUM_API_KEY_TYPE.SERVICE]),
  );
}

export function ApiKeyPublicProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(ApiKeyXApiKeyGuard, ApiKeyPayloadTypeGuard),
    SetMetadata(API_KEY_TYPE_META_KEY, [ENUM_API_KEY_TYPE.PUBLIC]),
  );
}

export const GetApiKey = createParamDecorator(
  <T>(returnPlain: boolean, ctx: ExecutionContext): T => {
    const { __apiKey } = ctx
      .switchToHttp()
      .getRequest<IRequestApp & { __apiKey: TApiKeyEntity }>();
    return (returnPlain ? __apiKey : __apiKey) as T; //! to reviews
  },
);
