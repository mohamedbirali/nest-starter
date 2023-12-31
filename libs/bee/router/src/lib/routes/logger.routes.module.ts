import { Module } from '@nestjs/common';
import { LoggerController, LoggerModule } from '@bee/common/logger';
import { ApiKeyModule } from '@bee/common/api-key';

@Module({
  controllers: [LoggerController],
  imports: [LoggerModule, ApiKeyModule],
})
export class LoggerRoutesModule {}
