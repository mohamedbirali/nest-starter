import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { DatabaseModule } from '@bee/common/database';
import { UserAuthController } from './controllers/user.auth.controller';
import { UserRepo } from './repo/user.repo';
import { UserAdminController } from './controllers/user.admin.controller';
import { UserAuthService } from './services/user.auth.service';
import { AuthModule } from '@bee/common/auth';
import { HelperModule } from '@bee/common/helper';
import { EmailTemplateModule } from '@bee/common/mailer';

@Module({
  controllers: [UserAdminController, UserAuthController],
  providers: [UserService, UserAuthService, UserRepo],
  exports: [UserService, UserAuthService, UserRepo],
  imports: [DatabaseModule, AuthModule, HelperModule, EmailTemplateModule],
})
export class UserModule {}
