import {
  applyDecorators,
  SerializeOptions,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { ENUM_HELPER_FILE_TYPE } from '@bee/common/helper'; ///constants/helper.enum.constant';
import {
  RESPONSE_FILE_TYPE_META_KEY,
  RESPONSE_MESSAGE_PATH_META_KEY,
  RESPONSE_MESSAGE_PROPERTIES_META_KEY,
  RESPONSE_SERIALIZATION_META_KEY,
} from '../constants/response.constant';
import { ResponseDefaultInterceptor } from '../interceptors/response.default.interceptor';
import { ResponseFileInterceptor } from '../interceptors/response.file.interceptor';
import { ResponsePagingInterceptor } from '../interceptors/response.paging.interceptor';
import {
  IResponseOptions,
  IResponsePagingOptions,
  IResponseFileOptions,
} from '../interfaces/response.interface';

export function Response<T>(
  messagePath: string,
  options?: IResponseOptions<T>,
): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ResponseDefaultInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
    SetMetadata(RESPONSE_SERIALIZATION_META_KEY, options?.serialization),
    SetMetadata(
      RESPONSE_MESSAGE_PROPERTIES_META_KEY,
      options?.messageProperties,
    ),
  );
}

export function ResponseFile(
  options?: IResponseFileOptions<void>,
): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ResponseFileInterceptor),
    SetMetadata(RESPONSE_SERIALIZATION_META_KEY, options?.serialization),
    SetMetadata(
      RESPONSE_FILE_TYPE_META_KEY,
      options?.fileType ?? ENUM_HELPER_FILE_TYPE.CSV,
    ),
    SetMetadata(
      RESPONSE_MESSAGE_PROPERTIES_META_KEY,
      options?.messageProperties,
    ),
  );
}

export function ResponsePaging<T>(
  messagePath: string,
  options: IResponsePagingOptions<T>,
): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ResponsePagingInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
    SetMetadata(RESPONSE_SERIALIZATION_META_KEY, options?.serialization),
    SetMetadata(
      RESPONSE_MESSAGE_PROPERTIES_META_KEY,
      options?.messageProperties,
    ),
  );
}

export const ResponseSerializationOptions = SerializeOptions;
