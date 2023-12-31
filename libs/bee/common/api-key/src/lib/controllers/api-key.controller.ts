import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiKeyService } from '../services';
import { IResponse } from '@bee/common/response';
import { TApiKeyEntity } from '@bee/common/types';
import {
  ApiKeyServiceProtected,
  GetApiKey,
} from '../decorators/api-key.decorator';
import { ApiKeyCreateDto, ApiKeyUpdateDateDto, ApiKeyUpdateDto } from '../dtos';
import { ApiKeyAdminGetGuard } from '../decorators';
import { AuthJwtAccessProtected } from '@bee/common/auth';

@Controller({
  path: 'api-key',
  version: '1',
})
export class ApiKeyController {
  constructor(private readonly _apiKeyService: ApiKeyService) {}

  @Post('/create')
  // @ApiKeyAdminGetGuard() //! to fix: seed data
  // @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async create(@Body() body: ApiKeyCreateDto): Promise<IResponse> {
    return await this._apiKeyService.create(body);
  }

  @Get('list')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async list(): Promise<IResponse> {
    return await this._apiKeyService.findMany();
  }

  @Get('/get/:apiKey')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async get(@GetApiKey() apiKey: TApiKeyEntity): Promise<IResponse> {
    return await this._apiKeyService.findUniqueById(apiKey.id);
  }

  @Put('/update/:apiKey/reset')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async reset(@GetApiKey() apiKey: TApiKeyEntity): Promise<IResponse> {
    return await this._apiKeyService.reset(apiKey.key);
  }

  @Put('/update/:apiKey')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async updateName(
    @Body() body: ApiKeyUpdateDto,
    @GetApiKey() apiKey: TApiKeyEntity,
  ): Promise<IResponse> {
    return await this._apiKeyService.updateName(apiKey.key, body);
  }

  @Put('/update/:apiKey/inactive')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async inactive(@GetApiKey() apiKey: TApiKeyEntity): Promise<IResponse> {
    return await this._apiKeyService.inactive(apiKey.id);
  }

  @Put('/update/:apiKey/active')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async active(@GetApiKey() apiKey: TApiKeyEntity): Promise<IResponse> {
    return await this._apiKeyService.active(apiKey.id);
  }

  @Put('/update/:apiKey/date')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async updateDate(
    @Body() body: ApiKeyUpdateDateDto,
    @GetApiKey() apiKey: TApiKeyEntity,
  ): Promise<IResponse> {
    return await this._apiKeyService.updateDate(apiKey.id, body);
  }

  @Delete('/delete/:apiKey')
  @ApiKeyAdminGetGuard()
  @ApiKeyServiceProtected()
  @AuthJwtAccessProtected()
  async delete(@GetApiKey() apiKey: TApiKeyEntity): Promise<IResponse> {
    return await this._apiKeyService.deleteById(apiKey.id);
  }
}
