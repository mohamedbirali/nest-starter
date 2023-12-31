import { Module } from '@nestjs/common';
import { DebuggerOptionService } from './services/debugger.options.service';

@Module({
  providers: [DebuggerOptionService],
  exports: [DebuggerOptionService],
  imports: [],
})
export class DebuggerOptionsModule {}
