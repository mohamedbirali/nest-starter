import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '../services/logger.service';
import {
  ENUM_LOGGER_ACTION,
  ENUM_LOGGER_LEVEL,
} from '../constants/logger.enum.constant';
import {
  LOGGER_ACTION_META_KEY,
  LOGGER_OPTIONS_META_KEY,
} from '../constants/logger.constant';
import { ILoggerOptions } from '../interfaces/logger.interface';

@Injectable()
export class LoggerInterceptor implements NestInterceptor<any> {
  constructor(
    private readonly reflector: Reflector,
    private readonly loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const ctx: HttpArgumentsHost = context.switchToHttp();
      const { apiKey, method, originalUrl, user, __id, body, params, path } =
        ctx.getRequest();
      const responseExpress = ctx.getResponse<Response>();

      return next.handle().pipe(
        tap((response: Record<string, any>) => {
          const responseData: Record<string, any> = response;
          const responseStatus: number = responseExpress.statusCode;
          const statusCode = responseData?.['statusCode'] ?? responseStatus;

          const loggerAction: ENUM_LOGGER_ACTION =
            this.reflector.get<ENUM_LOGGER_ACTION>(
              LOGGER_ACTION_META_KEY,
              context.getHandler(),
            );
          const loggerOptions: ILoggerOptions =
            this.reflector.get<ILoggerOptions>(
              LOGGER_OPTIONS_META_KEY,
              context.getHandler(),
            );

          this.loggerService
            .raw({
              level: loggerOptions?.level ?? ENUM_LOGGER_LEVEL.INFO,
              action: loggerAction,
              description:
                loggerOptions?.description ??
                `Request ${method} called, url ${originalUrl}, and action ${loggerAction}`,
              api_key_id: +apiKey?.id,
              request_id: __id,
              method: method,
              role_type: user?.user?.type,
              params: JSON.stringify(params),
              bodies: JSON.stringify(body),
              path,
              status_code: statusCode,
              tags: loggerOptions?.tags ?? [],
            })
            .subscribe();
        }),
      );
    }

    return next.handle();
  }
}
