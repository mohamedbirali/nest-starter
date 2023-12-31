import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaRepo extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
    this.$on(<never>'query', (e) => {
      console.log('Query: ' + e['query']);
      console.log('Params: ' + e['params']);
      console.log('Duration: ' + e['duration'] + 'ms');
    });
  }
}
