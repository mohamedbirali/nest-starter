import { PrismaRepo } from '@bee/common/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplateRepo {
  constructor(private readonly _prisma: PrismaRepo) {}

  async create(email: any) {
    return await this._prisma.email_template_entity.create({
      data: { ...email },
    });
  }

  async createCvProposal(proposal: any) {
    return await this._prisma.cv_proposals.create({
      data: { ...proposal },
    });
  }

  async findMany() {
    return await this._prisma.cv_proposals.findMany({
      where: {
        is_answered: false,
      },
    });
  }

  async findByEmail(email: string) {
    return await this._prisma.cv_proposals.findUniqueOrThrow({
      where: { entreprise_mail: email },
    });
  }

  async updateAttempts(email: string, send_attempts: number) {
    return await this._prisma.cv_proposals.update({
      where: { entreprise_mail: email },
      data: {
        send_attempts,
      },
    });
  }

  async updateAttemptsTemp() {
    return await this._prisma.cv_proposals.updateMany({
      where: { is_answered: false },
      data: {
        send_attempts: 1,
      },
    });
  }

  async updateProjectType() {
    return await this._prisma.cv_proposals.updateMany({
      data: {
        entreprise_market_value: 'le futur de la tech',
      },
      where: {
        entreprise_market_value: 'le futur de la tech.',
      },
    });
  }
}
