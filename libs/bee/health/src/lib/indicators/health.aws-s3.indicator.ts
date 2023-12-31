import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { AwsS3Service } from '@bee/common/aws';

@Injectable()
export class HealthAwsS3Indicator extends HealthIndicator {
  constructor(private readonly awsS3Service: AwsS3Service) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.awsS3Service.checkBucketExistence();
      return this.getStatus(key, true);
    } catch (err: unknown) {
      throw new HealthCheckError(
        'HealthAwsS3Indicator failed',
        this.getStatus(key, false),
      );
    }
  }
}
