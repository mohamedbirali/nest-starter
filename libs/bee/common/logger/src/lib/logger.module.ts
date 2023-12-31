import { Global, Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { DatabaseModule } from '@bee/common/database';
import { LoggerRepo } from './repo/logger.repo';

@Global()
@Module({
  providers: [LoggerService, LoggerRepo],
  exports: [LoggerService],
  imports: [DatabaseModule],
})
export class LoggerModule {}
