import { DynamicModule, Module } from '@nestjs/common';
import { AuthJwtAccessStrategy } from './guards'; ///jwt-access/auth.jwt-access.strategy';
import { AuthJwtRefreshStrategy } from './guards'; ///jwt-refresh/auth.jwt-refresh.strategy';
import { AuthService } from './services';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [],
  imports: [],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [AuthJwtAccessStrategy, AuthJwtRefreshStrategy],
      exports: [],
      controllers: [],
      imports: [],
    };
  }
}
