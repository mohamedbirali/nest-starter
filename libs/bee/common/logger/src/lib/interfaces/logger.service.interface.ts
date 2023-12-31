import { TEntityCreate, TPromise$, TLoggerEntity } from '@bee/common/types';

export interface ILoggerService {
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
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity>;

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
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity>;

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
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity>;

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
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity>;

  raw({
    level,
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
  }: TEntityCreate<TLoggerEntity>): TPromise$<TLoggerEntity>;
}
