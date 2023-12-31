import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../services';
import { IResponse, Response } from '@bee/common/response';
import {
  ApiKeyAdminGetGuard,
  ApiKeyServiceProtected,
} from '@bee/common/api-key';
import { AuthJwtAccessProtected } from '@bee/common/auth';

@Controller('logs')
export class LoggerController {
  constructor(private readonly _loggerService: LoggerService) {}

  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  @Response('log.findMany')
  @Get()
  async findMany(): Promise<IResponse> {
    return await this._loggerService.findMany();
  }
}
