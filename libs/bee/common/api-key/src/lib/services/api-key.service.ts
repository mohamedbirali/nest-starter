import { Injectable } from '@nestjs/common';
import { ApiKeyRepo } from '../repo';
import { IResponse } from '@bee/common/response';
import { TApiKeyEntity } from '@bee/common/types';
import { ApiKeyCreateDto, ApiKeyUpdateDateDto, ApiKeyUpdateDto } from '../dtos';
import {
  HelperDateService,
  HelperHashService,
  HelperStringService,
} from '@bee/common/helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyService {
  private readonly env: string = this._configService.get('app.env');
  constructor(
    private readonly _apiKeyRepo: ApiKeyRepo,
    private readonly _helperStringService: HelperStringService,
    private readonly _configService: ConfigService,
    private readonly _helperHashService: HelperHashService,
    private readonly _helperDateService: HelperDateService,
  ) {}

  async create({ name, type, endDate, startDate }: ApiKeyCreateDto) {
    const key = await this.createKey();
    const secret = await this.createSecret();
    const hash: string = await this.createHashApiKey(key, secret);

    const apiKeyCreated = await this._apiKeyRepo.create({
      key,
      hash,
      name,
      type,
      start_at: this._helperDateService.startOfDay(startDate),
      end_at: this._helperDateService.endOfDay(endDate),
    });

    return {
      data: {
        ...apiKeyCreated,
        secret,
      },
    };
  }

  async findMany(): Promise<IResponse> {
    const apiKeys = await this._apiKeyRepo.findMany();
    return {
      data: {
        counts: apiKeys.length,
        ...apiKeys,
      },
    };
  }

  async findUniqueById(id: number): Promise<IResponse> {
    const apiKey: TApiKeyEntity = await this._apiKeyRepo.findUniqueById(id);
    return {
      data: apiKey,
    };
  }

  async findOneByActiveKey(key: string): Promise<IResponse> {
    const apiKey = await this._apiKeyRepo.findUniqueByActiveKey(key);
    return {
      data: apiKey,
    };
  }

  async getTotal(): Promise<IResponse> {
    throw new Error('Method not implemented.');
  }

  async reset(key: string) {
    const secret = await this.createSecret();
    const hash = await this.createHashApiKey(key, secret);

    await this._apiKeyRepo.updateByKey(key, { hash });

    return {
      data: {
        secret,
      },
    };
  }

  async updateDate(id: number, body: ApiKeyUpdateDateDto): Promise<IResponse> {
    const start_at = this._helperDateService.startOfDay(body.startDate);
    const end_at = this._helperDateService.endOfDay(body.endDate);
    const updated = await this._apiKeyRepo.updateById(id, { start_at, end_at });
    return {
      data: {
        id: updated.id,
      },
    };
  }

  async updateName(key: string, body: ApiKeyUpdateDto): Promise<IResponse> {
    const _key = await this._apiKeyRepo.updateByKey(key, { name: body.name });
    return {
      data: {
        id: _key.id,
      },
    };
  }

  async active(id: number): Promise<IResponse> {
    const updated = await this._apiKeyRepo.updateById(id, { is_active: true });
    return {
      data: {
        id: updated.id,
      },
    };
  }

  async inactive(id: number): Promise<IResponse> {
    const updated = await this._apiKeyRepo.updateById(id, { is_active: false });
    return {
      data: {
        id: updated.id,
      },
    };
  }

  async deleteById(id: number): Promise<IResponse> {
    const deleted = await this._apiKeyRepo.delete(id);
    return {
      data: {
        id: deleted.id,
      },
    };
  }

  /**
   * Helpers
   *
   */
  //

  async createKey(): Promise<string> {
    return this._helperStringService.random(25, {
      safe: false,
      upperCase: true,
      prefix: `${this.env}_`,
    });
  }

  async createSecret(): Promise<string> {
    return this._helperStringService.random(35, {
      safe: false,
      upperCase: true,
    });
  }

  async createHashApiKey(key: string, secret: string): Promise<string> {
    return this._helperHashService.sha256(`${key}:${secret}`);
  }

  async validateHashApiKey(
    hashFromRequest: string,
    hash: string,
  ): Promise<boolean> {
    return this._helperHashService.sha256Compare(hashFromRequest, hash);
  }
}
