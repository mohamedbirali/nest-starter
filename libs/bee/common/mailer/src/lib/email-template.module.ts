import { Module } from '@nestjs/common';
import { EmailTemplateController } from './email-template.controller';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateRepo } from './email-template.repo';
import { DatabaseModule } from '@bee/common/database';
import { EmailJobProcessor } from './services/email.job.process';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BullModule } from '@nestjs/bullmq';

@Module({
  exports: [EmailTemplateService, EmailTemplateRepo, EmailJobProcessor],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService, EmailTemplateRepo, EmailJobProcessor],
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'email',
      connection: { host: 'localhost', port: 6379 },
    }),
  ],
})
export class EmailTemplateModule {}
