import { UserModule, UserAdminController } from '@bee/modules/user';
import { ApiKeyController, ApiKeyModule } from '@bee/common/api-key';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserAdminController, ApiKeyController],
  providers: [],
  exports: [],
  imports: [UserModule, ApiKeyModule],
})
export class RoutesAdminModule {}
