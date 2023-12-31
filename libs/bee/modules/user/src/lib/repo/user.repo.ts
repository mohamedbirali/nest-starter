import { PrismaRepo } from '@bee/common/database';
import { Injectable } from '@nestjs/common';
import { UserCreateDto } from '../dtos';
import { TCount, TUserEntity, TPromise } from '@bee/common/types';

@Injectable()
export class UserRepo {
  constructor(private readonly _prisma: PrismaRepo) {}

  async isUserExists(user: Partial<UserCreateDto>): TPromise<TUserEntity> {
    return await this._prisma.users.findFirst({
      where: {
        OR: [
          { mobile_number: user.mobileNumber },
          { email: user.email },
          { username: user.username },
        ],
      },
    });
  }

  async findUniqueById(id: number) {
    return await this._prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        avatar: true,
        refresh_token: true,
        role: true,
      },
    });
  }

  async findByEmail(email: string): TPromise<TUserEntity> {
    return await this._prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string): TPromise<TUserEntity> {
    return await this._prisma.users.findUnique({
      where: {
        username,
      },
    });
  }

  async findByMobileNumber(mobile_number: string): TPromise<TUserEntity> {
    return await this._prisma.users.findUnique({
      where: {
        mobile_number,
      },
    });
  }

  async create(user: any): TPromise<TUserEntity> {
    return await this._prisma.users.create({ data: { ...user } });
  }

  async update(user: any): TPromise<TUserEntity> {
    return await this._prisma.users.update({
      where: { email: user.email },
      data: { ...user },
    });
  }

  async delete(id: number): TPromise<TUserEntity> {
    return await this._prisma.users.delete({ where: { id } });
  }

  async deleteAllUsers(): Promise<TCount> {
    return await this._prisma.users.deleteMany();
  }
}
