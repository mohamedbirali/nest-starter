import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import {
  RequestJsonBodyParserMiddleware,
  RequestRawBodyParserMiddleware,
  RequestTextBodyParserMiddleware,
  RequestUrlencodedBodyParserMiddleware,
} from '../middleware/body-parser/request.body-parser.middleware';
import { RequestCorsMiddleware } from '../middleware/cors/request.cors.middleware';
import { RequestHelmetMiddleware } from '../middleware/helmet/request.helmet.middleware';
import { RequestIdMiddleware } from '../middleware/id/request.id.middleware';
import { RequestTimestampMiddleware } from '../middleware/timestamp/request.timestamp.middleware';
import { RequestTimezoneMiddleware } from '../middleware/timezone/request.timezone.middleware';
import { RequestUserAgentMiddleware } from '../middleware/user-agent/request.user-agent.middleware';

import { RequestVersionMiddleware } from '../middleware/version/request.version.middleware';

@Module({})
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        RequestHelmetMiddleware,
        RequestIdMiddleware,
        RequestJsonBodyParserMiddleware,
        RequestTextBodyParserMiddleware,
        RequestRawBodyParserMiddleware,
        RequestUrlencodedBodyParserMiddleware,
        RequestCorsMiddleware,
        RequestVersionMiddleware,
        RequestUserAgentMiddleware,
        RequestTimestampMiddleware,
        RequestTimezoneMiddleware,
      )
      .forRoutes('*');
  }
}
