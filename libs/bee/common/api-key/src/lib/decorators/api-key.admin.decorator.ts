import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { API_KEY_ACTIVE_META_KEY } from '../constants';
import {
  ApiKeyPutToRequestGuard,
  ApiKeyNotFoundGuard,
  ApiKeyActiveGuard,
  ApiKeyExpiredGuard,
} from '../guards';

export function ApiKeyAdminGetGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(ApiKeyPutToRequestGuard, ApiKeyNotFoundGuard),
  );
}

export function ApiKeyAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      ApiKeyPutToRequestGuard,
      ApiKeyNotFoundGuard,
      ApiKeyActiveGuard,
      ApiKeyExpiredGuard,
    ),
    SetMetadata(API_KEY_ACTIVE_META_KEY, [true]),
  );
}

export function ApiKeyAdminUpdateResetGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      ApiKeyPutToRequestGuard,
      ApiKeyNotFoundGuard,
      ApiKeyActiveGuard,
      ApiKeyExpiredGuard,
    ),
    SetMetadata(API_KEY_ACTIVE_META_KEY, [true]),
  );
}

export function ApiKeyAdminUpdateActiveGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      ApiKeyPutToRequestGuard,
      ApiKeyNotFoundGuard,
      ApiKeyActiveGuard,
      ApiKeyExpiredGuard,
    ),
    SetMetadata(API_KEY_ACTIVE_META_KEY, [false]),
  );
}

export function ApiKeyAdminUpdateInactiveGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      ApiKeyPutToRequestGuard,
      ApiKeyNotFoundGuard,
      ApiKeyActiveGuard,
      ApiKeyExpiredGuard,
    ),
    SetMetadata(API_KEY_ACTIVE_META_KEY, [true]),
  );
}

export function ApiKeyAdminDeleteGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(ApiKeyPutToRequestGuard, ApiKeyNotFoundGuard),
  );
}
