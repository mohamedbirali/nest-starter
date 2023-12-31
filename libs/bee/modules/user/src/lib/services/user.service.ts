import { Injectable } from '@nestjs/common';
import { TPromise$, TUserEntity } from '@bee/common/types';
import { from } from 'rxjs';
import { PrismaRepo } from '@bee/common/database';

@Injectable()
export class UserService {
  constructor(private readonly _prismaRepo: PrismaRepo) {}

  create(data: any): TPromise$<TUserEntity> {
    return from(
      this._prismaRepo.users.create({
        data,
      }),
    );
  }

  getUserById(id: number): TPromise$<TUserEntity> {
    return from(
      this._prismaRepo.users.findUnique({
        where: {
          id,
        },
      }),
    );
  }

  getAll(): TPromise$<TUserEntity[]> {
    return from(this._prismaRepo.users.findMany());
  }

  update(user: Partial<TUserEntity>) {
    return this._prismaRepo.users.update({
      data: { ...user },
      where: { id: user.id },
    });
  }

  delete(id: number): TPromise$<TUserEntity> {
    return from(this._prismaRepo.users.delete({ where: { id } }));
  }
}
