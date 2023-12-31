import { Module, DynamicModule, Type, ForwardReference } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { LoggerRoutesModule, RoutesPublicModule } from './routes';
import { RoutesAdminModule } from './routes/admin.routes.module';
import { UserAuthModule } from './routes/user-auth.routes.module';

@Module({})
export class RouterBeeModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];

    if (process.env.HTTP_ENABLE === 'true') {
      imports.push(
        RoutesPublicModule,
        RoutesAdminModule,
        UserAuthModule,
        LoggerRoutesModule,
        NestJsRouterModule.register([
          {
            path: '/admin',
            module: RoutesAdminModule,
          },
          {
            path: '/public',
            module: RoutesPublicModule,
          },
          {
            path: '/auth',
            module: UserAuthModule,
          },
          {
            path: '/logger',
            module: LoggerRoutesModule,
          },
        ]),
      );
    }

    return {
      module: RouterBeeModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
