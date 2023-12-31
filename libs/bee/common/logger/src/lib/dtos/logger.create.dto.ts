import {
  ENUM_LOGGER_ACTION,
  ENUM_LOGGER_LEVEL,
} from '../constants/logger.enum.constant';
import { ENUM_REQUEST_METHOD } from '@bee/common/request';
import { ENUM_ROLE_TYPE } from '@bee/modules/role';

export class LoggerCreateDto {
  action: ENUM_LOGGER_ACTION;
  description: string;
  apiKey?: string;
  user?: string;
  requestId?: string;
  method: ENUM_REQUEST_METHOD;
  path: string;
  role?: string;
  type?: ENUM_ROLE_TYPE;
  tags?: string[];
  params?: Record<string, any>;
  bodies?: Record<string, any>;
  statusCode?: number;
}

export class LoggerCreateRawDto extends LoggerCreateDto {
  level: ENUM_LOGGER_LEVEL;
}
