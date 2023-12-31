import {
  DynamicModule,
  ForwardReference,
  Global,
  Module,
  Provider,
  Type,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { DebuggerOptionsModule } from './debugger.options.module';
import { DebuggerMiddlewareModule } from './middleware/debugger.middleware.module';
import { DebuggerOptionService } from './services/debugger.options.service';
import { DebuggerService } from './services/debugger.service';

@Global()
@Module({})
export class DebuggerModule {
  static forRoot(): DynamicModule {
    const providers: Provider<any>[] = [];
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];

    if (
      process.env.DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE === 'true' ||
      process.env.DEBUGGER_SYSTEM_WRITE_INTO_FILE === 'true'
    ) {
      providers.push(DebuggerService);
      imports.push(
        WinstonModule.forRootAsync({
          inject: [DebuggerOptionService],
          imports: [DebuggerOptionsModule],
          useFactory: (debuggerOptionsService: DebuggerOptionService) =>
            debuggerOptionsService.createLogger(),
        }),
      );
    }

    return {
      module: DebuggerModule,
      providers,
      exports: providers,
      controllers: [],
      imports: [...imports, DebuggerMiddlewareModule],
    };
  }
}
