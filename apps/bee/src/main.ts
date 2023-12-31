import { NestApplication, NestFactory } from '@nestjs/core';
import { BeeAppEnteryModule } from '@bee/entery';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(BeeAppEnteryModule);
  const configService = app.get(ConfigService);
  const databaseUri: string = configService.get<string>('database.host');
  const env: string = configService.get<string>('app.env');
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioningPrefix: string = configService.get<string>(
    'app.versioning.prefix',
  );
  const version: string = configService.get<string>('app.versioning.version');

  // enable
  const httpEnable: boolean = configService.get<boolean>('app.http.enable');
  const versionEnable: string = configService.get<string>(
    'app.versioning.enable',
  );
  const jobEnable: boolean = configService.get<boolean>('app.jobEnable');

  process.env.NODE_ENV = env;

  // Global
  app.setGlobalPrefix(globalPrefix);
  useContainer(app.select(BeeAppEnteryModule), { fallbackOnErrors: true });

  // Versioning
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }

  // Listen
  await app.listen(port, host);

  Logger.log(`==========================================================`);

  Logger.log(`Environment Variable (only for prod)`, 'NestApplication');
  configService.get('app.env') === 'prod'
    ? Logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication')
    : '';

  Logger.log(`==========================================================`);

  Logger.log(`Job is ${jobEnable}`, 'NestApplication');
  Logger.log(
    `Http is ${httpEnable}, ${
      httpEnable ? 'routes registered' : 'no routes registered'
    }`,
    'NestApplication',
  );
  Logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');

  Logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  Logger.log(`Database uri ${databaseUri}`, 'NestApplication');

  Logger.log(`==========================================================`);
}
bootstrap();
