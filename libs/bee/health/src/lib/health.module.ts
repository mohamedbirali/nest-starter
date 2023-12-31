import { Module } from '@nestjs/common';
import { AwsModule } from '@bee/common/aws'; //aws.module';
import { HealthAwsS3Indicator } from './indicators/health.aws-s3.indicator';

@Module({
  providers: [HealthAwsS3Indicator],
  exports: [HealthAwsS3Indicator],
  imports: [AwsModule],
})
export class HealthModule {}
