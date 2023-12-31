import { TEntityCreate, TPromise$ } from '@bee/common/types';
import { Injectable } from '@nestjs/common';
import { ENUM_LOGGER_LEVEL } from '../constants/logger.enum.constant';
import { ILoggerService } from '../interfaces/logger.service.interface';
import { TLoggerEntity } from '@bee/common/types';
import { from } from 'rxjs';
import { PrismaRepo } from '@bee/common/database';
import { LoggerRepo } from '../repo/logger.repo';
import { IResponse } from '@bee/common/response';

@Injectable()
export class LoggerService implements ILoggerService {
  constructor(private readonly _loggerRepo: LoggerRepo) {}

  info({
    action,
    description,
    api_key_id,
    method,
    request_id,
    role_type,
    params,
    bodies,
    path,
    status_code,
    tags,
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity> {
    const create = {
      level: ENUM_LOGGER_LEVEL.INFO,
      action,
      description,
      api_key_id,
      method,
      request_id,
      role_type,
      params,
      bodies,
      path,
      status_code,
      tags,
    };

    return from(this._loggerRepo.create({ ...create }));
  }

  debug({
    action,
    description,
    api_key_id,
    method,
    request_id,
    role_type,
    params,
    bodies,
    path,
    status_code,
    tags,
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity> {
    const create = {
      level: ENUM_LOGGER_LEVEL.DEBUG,
      action,
      description,
      api_key_id,
      method,
      request_id,
      role_type,
      params,
      bodies,
      path,
      status_code,
      tags,
    };

    return from(this._loggerRepo.create({ ...create }));
  }

  warn({
    action,
    description,
    api_key_id,
    method,
    request_id,
    role_type,
    params,
    bodies,
    path,
    status_code,
    tags,
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity> {
    const create = {
      level: ENUM_LOGGER_LEVEL.WARN,
      action,
      description,
      api_key_id,
      method,
      request_id,
      role_type,
      params,
      bodies,
      path,
      status_code,
      tags,
    };

    return from(this._loggerRepo.create({ ...create }));
  }

  fatal({
    action,
    description,
    api_key_id,
    method,
    request_id,
    role_type,
    params,
    bodies,
    path,
    status_code,
    tags,
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity> {
    const create = {
      level: ENUM_LOGGER_LEVEL.FATAL,
      action,
      description,
      api_key_id,
      method,
      request_id,
      role_type,
      params,
      bodies,
      path,
      status_code,
      tags,
    };

    return from(this._loggerRepo.create({ ...create }));
  }

  async findMany(): Promise<IResponse> {
    const logs = await this._loggerRepo.findMany();
    return {
      data: {
        counts: logs.length,
        ...logs,
      },
    };
  }

  /**
   * To seed table
   * @param param0
   * @returns
   */
  raw({
    action,
    description,
    api_key_id,
    method,
    request_id,
    role_type,
    params,
    bodies,
    path,
    status_code,
    tags,
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity> {
    const create = {
      level: ENUM_LOGGER_LEVEL.DEBUG,
      action,
      description,
      api_key_id,
      method,
      request_id,
      role_type,
      params,
      bodies,
      path,
      status_code,
      tags,
    };

    return from(this._loggerRepo.create({ ...create }));
  }
}
