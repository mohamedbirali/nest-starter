import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Response } from '@bee/common/response';
import { IResponse } from '@bee/common/response';
import { HealthAwsS3Indicator } from '../indicators/health.aws-s3.indicator';
import { HealthSerialization } from '../serializations/health.serialization';
import { PrismaClient } from '@prisma/client';

@ApiTags('health')
@Controller({
  version: VERSION_NEUTRAL,
  path: '/health',
})
export class HealthPublicController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly diskHealthIndicator: DiskHealthIndicator,
    private readonly awsS3Indicator: HealthAwsS3Indicator,
    private readonly prismaIndicator: PrismaHealthIndicator,
  ) {}

  @Response('health.check', { serialization: HealthSerialization })
  @HealthCheck()
  @Get('/aws')
  async checkAws(): Promise<IResponse> {
    const data = await this.health.check([
      () => this.awsS3Indicator.isHealthy('awsS3Bucket'),
    ]);

    return {
      data,
    };
  }

  @Response('health.check', { serialization: HealthSerialization })
  @HealthCheck()
  @Get('/database')
  async checkDatabase(): Promise<IResponse> {
    const data = await this.health.check([
      () =>
        this.prismaIndicator.pingCheck('db', new PrismaClient(), {
          timeout: 15_000,
        }),
    ]);

    return {
      data,
    };
  }

  @Response('health.check', { serialization: HealthSerialization })
  @HealthCheck()
  @Get('/memory-heap')
  async checkMemoryHeap(): Promise<IResponse> {
    const data = await this.health.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memoryHeap', 300 * 1024 * 1024),
    ]);

    return {
      data,
    };
  }

  @Response('health.check', { serialization: HealthSerialization })
  @HealthCheck()
  @Get('/memory-rss')
  async checkMemoryRss(): Promise<IResponse> {
    const data = await this.health.check([
      () => this.memoryHealthIndicator.checkRSS('memoryRss', 300 * 1024 * 1024),
    ]);

    return {
      data,
    };
  }

  @Response('health.check', { serialization: HealthSerialization })
  @HealthCheck()
  @Get('/storage')
  async checkStorage(): Promise<IResponse> {
    const data = await this.health.check([
      () =>
        this.diskHealthIndicator.checkStorage('diskHealth', {
          thresholdPercent: 0.75,
          path: '/',
        }),
    ]);

    return {
      data,
    };
  }
}
