import { PrismaRepo } from '@bee/common/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyRepo {
  constructor(private readonly _prismaRepo: PrismaRepo) {}

  async create(data: any) {
    return await this._prismaRepo.api_keys.create({
      data: {
        ...data,
      },
    });
  }

  async findMany() {
    return await this._prismaRepo.api_keys.findMany();
  }

  async findUniqueById(id: number) {
    return await this._prismaRepo.api_keys.findUnique({ where: { id } });
  }

  async findUniqueByKey(apiKey: string) {
    return await this._prismaRepo.api_keys.findUnique({
      where: { key: apiKey },
    });
  }

  async findUniqueByActiveKey(key: string) {
    return await this._prismaRepo.api_keys.findFirst({
      where: {
        key,
        is_active: true,
      },
    });
  }

  async updateByKey(key: string, data: any) {
    return await this._prismaRepo.api_keys.update({
      where: { key },
      data: {
        ...data,
      },
    });
  }

  async updateById(id: number, data: any) {
    return await this._prismaRepo.api_keys.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: number) {
    return await this._prismaRepo.api_keys.delete({ where: { id } });
  }
}
