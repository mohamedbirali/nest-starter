import { ENUM_LOGGER_LEVEL } from '../constants/logger.enum.constant';

export interface ILoggerOptions {
  description?: string;
  tags?: string[];
  level?: ENUM_LOGGER_LEVEL;
}
