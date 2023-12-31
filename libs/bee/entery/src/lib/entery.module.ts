import { Module } from '@nestjs/common';
import { TestController } from './controllers/entery.controller';
import { CommonCoreModule } from '@bee/common/core';
import { JobsModule } from '@bee/jobs';
import { RouterBeeModule } from '@bee/router';

@Module({
  controllers: [TestController],
  imports: [CommonCoreModule, RouterBeeModule.forRoot(), JobsModule],
})
export class BeeAppEnteryModule {}
