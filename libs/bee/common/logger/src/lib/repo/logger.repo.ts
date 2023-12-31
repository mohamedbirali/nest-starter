import { PrismaRepo } from '@bee/common/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerRepo {
  constructor(private readonly _prismaRepo: PrismaRepo) {}

  async findMany() {
    return await this._prismaRepo.loggers.findMany();
  }

  async create(data: any) {
    return await this._prismaRepo.loggers.create({
      data: {
        ...data,
      },
    });
  }
}
