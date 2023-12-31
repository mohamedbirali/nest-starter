import { Module } from '@nestjs/common';
import { ApiKeyXApiKeyStrategy } from './guards/x-api-key/api-key.x-api-key.strategy';
import { ApiKeyService } from './services/api-key.service';
import { DatabaseModule } from '@bee/common/database';
import { ApiKeyRepo } from './repo';

@Module({
  providers: [ApiKeyService, ApiKeyRepo, ApiKeyXApiKeyStrategy],
  exports: [ApiKeyService, ApiKeyRepo],
  imports: [DatabaseModule],
})
export class ApiKeyModule {}
