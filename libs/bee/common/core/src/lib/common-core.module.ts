import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from '@bee/configs';
import * as Joi from 'joi';
import { ENUM_APP_ENVIRONMENT, APP_LANGUAGE } from '@bee/env';
import { ENUM_MESSAGE_LANGUAGE, MessageModule } from '@bee/common/message';
import { HelperModule } from '@bee/common/helper';
import { ResponseModule } from '@bee/common/response';
import { RequestModule } from '@bee/common/request';
import { AuthModule } from '@bee/common/auth';
import { PaginationModule } from '@bee/common/pagination';
import { PolicyModule } from '@bee/common/policy';
import { LoggerInterceptor, LoggerModule } from '@bee/common/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorModule } from '@bee/common/error';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string()
          .valid(...Object.values(ENUM_APP_ENVIRONMENT))
          .default('development')
          .required(),
        APP_LANGUAGE: Joi.string()
          .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
          .default(APP_LANGUAGE)
          .required(),

        HTTP_ENABLE: Joi.boolean().default(true).required(),
        HTTP_HOST: [
          Joi.string().ip({ version: 'ipv4' }).required(),
          Joi.valid('localhost').required(),
        ],
        HTTP_PORT: Joi.number().default(3000).required(),
        HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
        HTTP_VERSION: Joi.number().required(),

        DEBUGGER_HTTP_WRITE_INTO_FILE: Joi.boolean().default(false).required(),
        DEBUGGER_HTTP_WRITE_INTO_CONSOLE: Joi.boolean()
          .default(false)
          .required(),
        DEBUGGER_SYSTEM_WRITE_INTO_FILE: Joi.boolean()
          .default(false)
          .required(),
        DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE: Joi.boolean()
          .default(false)
          .required(),

        JOB_ENABLE: Joi.boolean().default(false).required(),

        DATABASE_HOST: Joi.string()
          .default('mongodb://localhost:27017')
          .required(),
        DATABASE_NAME: Joi.string().default('ack').required(),
        DATABASE_USER: Joi.string().allow(null, '').optional(),
        DATABASE_PASSWORD: Joi.string().allow(null, '').optional(),
        DATABASE_DEBUG: Joi.boolean().default(false).required(),
        DATABASE_OPTIONS: Joi.string().allow(null, '').optional(),

        AUTH_JWT_SUBJECT: Joi.string().required(),
        AUTH_JWT_AUDIENCE: Joi.string().required(),
        AUTH_JWT_ISSUER: Joi.string().required(),

        AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
          .alphanum()
          .min(5)
          .max(50)
          .required(),
        AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string().default('15m').required(),

        AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
          .alphanum()
          .min(5)
          .max(50)
          .required(),
        AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string().default('7d').required(),
        AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION: Joi.string()
          .default('15m')
          .required(),

        AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean().default(false).required(),
        AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string()
          .allow(null, '')
          .min(20)
          .max(50)
          .optional(),
        AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string()
          .allow(null, '')
          .min(16)
          .max(50)
          .optional(),
        AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string()
          .allow(null, '')
          .min(20)
          .max(50)
          .optional(),
        AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string()
          .allow(null, '')
          .min(16)
          .max(50)
          .optional(),

        AWS_CREDENTIAL_KEY: Joi.string().allow(null, '').optional(),
        AWS_CREDENTIAL_SECRET: Joi.string().allow(null, '').optional(),
        AWS_S3_REGION: Joi.string().allow(null, '').optional(),
        AWS_S3_BUCKET: Joi.string().allow(null, '').optional(),

        SSO_GOOGLE_CLIENT_ID: Joi.string().allow(null, '').optional(),
        SSO_GOOGLE_CLIENT_SECRET: Joi.string().allow(null, '').optional(),
        SSO_GOOGLE_CALLBACK_URL_LOGIN: Joi.string()
          .allow(null, '')
          .uri()
          .optional(),
        SSO_GOOGLE_CALLBACK_URL_SIGN_UP: Joi.string()
          .allow(null, '')
          .uri()
          .optional(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MessageModule,
    HelperModule,
    PaginationModule,
    ResponseModule,
    RequestModule,
    PolicyModule,
    LoggerModule,
    ErrorModule,
    AuthModule.forRoot(),
  ],
})
export class CommonCoreModule {}
