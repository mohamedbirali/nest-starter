import { TCvProposalEntity, TEmailTemplateEntity } from '@bee/common/types';
import { Injectable } from '@nestjs/common';
import { EmailTemplateRepo } from './email-template.repo';
import { EmailTemplateCreateDto } from './dto/create-email-template.dto';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { isEntrepriseValue, template } from './template';
import { CvProposalDto } from './dto/cv.proposal.dto';
import { HelperDateService } from '@bee/common/helper';
/* eslint-disable @nx/enforce-module-boundaries */
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
@Injectable()
export class EmailTemplateService {
  async updateCvProposal() {
    return await this._emailRepo.updateAttemptsTemp();
  }
  private readonly _transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    private readonly _emailRepo: EmailTemplateRepo,
    private readonly _configService: ConfigService,
    private readonly _helperDateService: HelperDateService,
    @InjectQueue('email') private readonly _emailQueue: Queue,
  ) {
    this._transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this._configService.get('emailTemplate.auth.user'),
        pass: this._configService.get('emailTemplate.auth.pass'),
      },
    });
  }

  async create(email: EmailTemplateCreateDto): Promise<TEmailTemplateEntity> {
    return await this._emailRepo.create(email);
  }

  async sendTokenActivateAccount(
    token: string,
    email: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this._transport.sendMail({
      to: email, // list of receivers
      subject: `🅰️ Développeur Angular : prêt à renforcer votre équipe ✅`,
      bcc: email,
      html: `
        <a href="http://localhost:3000/api/v1/auth/user/activate-account?token=${token}">Activate my account</a>
      `, //
    });
  }

  async createCvProposal(cvPropsal: CvProposalDto) {
    const cv = await this._emailRepo.createCvProposal(cvPropsal);
    return {
      data: {
        id: cv.id,
        email: cv.entreprise_mail,
        createdAt: cv.created_at,
      },
    };
  }

  async sendProposalByEmail(email: string) {
    const entreprise = await this._emailRepo.findByEmail(email);
    // const entreprise = entreprise;
    entreprise.entreprise_market_value = await isEntrepriseValue(
      entreprise.entreprise_name,
      entreprise.entreprise_market_value ?? '',
    );
    const emailTemplate = await this.#_emailTemplate(entreprise);

    await this._transport.sendMail({
      to: entreprise.entreprise_mail, // list of receivers
      subject: `🅰️ Développeur Angular : prêt à renforcer votre équipe ✅`,
      bcc: entreprise.entreprise_mail,
      html: emailTemplate,
      attachments: [
        {
          path: 'https://firebasestorage.googleapis.com/v0/b/organisation-chat.appspot.com/o/CV_french_Mohamed_Birali_front_end_developer.pdf?alt=media&token=c265102e-4dbf-44a4-8ab7-29ab78c813b2',
        },
      ],
    });

    return await this._emailRepo.updateAttempts(
      entreprise.entreprise_mail,
      (entreprise.send_attempts ?? 0) + 1,
    );
  }

  async sendCvProposals(): Promise<string> {
    // todo: get from db
    const cvs: TCvProposalEntity[] = await this._emailRepo.findMany();

    await this._emailQueue.add('cvProposals', cvs, { lifo: false });
    return 'Just Great';
  }

  async #_emailTemplate(cv: TCvProposalEntity) {
    return template(cv, this._helperDateService.format(new Date()));
  }
}
