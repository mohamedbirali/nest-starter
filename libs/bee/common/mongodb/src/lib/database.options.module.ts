import { Module } from '@nestjs/common';
import { DatabaseOptionsService } from './services/';

@Module({
  providers: [DatabaseOptionsService],
  exports: [DatabaseOptionsService],
  imports: [],
  controllers: [],
})
export class DatabaseOptionsModule {}
