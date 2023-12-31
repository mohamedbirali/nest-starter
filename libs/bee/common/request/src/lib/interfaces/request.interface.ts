import { Request } from 'express';
import { AuthAccessPayloadSerialization } from '@bee/common/auth'; ///serializations/auth.access-payload.serialization';
import { RequestPaginationSerialization } from '../serializations/request.pagination.serialization';
import { IResult } from 'ua-parser-js';

export interface IRequestApp<T = AuthAccessPayloadSerialization>
  extends Request {
  apiKey?: Record<string, any>;
  user?: T;

  __id: string;
  __xTimestamp?: number;
  __timestamp: number;
  __timezone: string;
  __customLang: string[];
  __xCustomLang: string;
  __version: string;
  __repoVersion: string;
  __userAgent: IResult;

  __class?: string;
  __function?: string;

  __pagination?: RequestPaginationSerialization;
}
