import { UserAuthController, UserModule } from '@bee/modules/user';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [UserAuthController],
})
export class UserAuthModule {}
