import { MessageModule, MessagePublicController } from '@bee/common/message';
import { HealthPublicController, HealthModule } from '@bee/health';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  controllers: [HealthPublicController, MessagePublicController],
  providers: [],
  exports: [],
  imports: [TerminusModule, HealthModule, MessageModule],
})
export class RoutesPublicModule {}

/**
 * api/v1/public/auth, health, message
 * api/v1/admin/auth, health, message
 * api/v1/user/auth, health, message
 */
