/* eslint-disable @nx/enforce-module-boundaries */
// import { InjectQueue } from '@nestjs/bullmq';
// import { Queue } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';
import { isEntrepriseValue, template } from '../template';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { TCvProposalEntity } from '@bee/common/types';
import { HelperDateService } from '@bee/common/helper';
import { EmailTemplateRepo } from '../email-template.repo';
import { Logger } from '@nestjs/common';

@Processor('email')
export class EmailJobProcessor extends WorkerHost {
  private readonly _transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    private readonly _configService: ConfigService,
    private readonly _helperDateService: HelperDateService,
    private readonly _emailRepo: EmailTemplateRepo,
  ) {
    super();
    this._transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this._configService.get('emailTemplate.auth.user'),
        pass: this._configService.get('emailTemplate.auth.pass'),
      },
    });
  }

  override async process(
    job: Job<any, any, string>,
    token?: string | undefined,
  ): Promise<any> {
    try {
      const cvs: TCvProposalEntity[] = job.data;
      const length = cvs.length;
      for (let i = 0; i < length; i++) {
        const element = cvs[i];
        element.entreprise_market_value = await isEntrepriseValue(
          element.entreprise_name,
          element.entreprise_market_value ?? '',
        );

        const emailTemplate = await this.#_emailTemplate(element);

        const mail = await this._transport.sendMail({
          to: element.entreprise_mail, // list of receivers
          subject: `🅰️ Développeur Angular : prêt à renforcer votre équipe ✅`,
          bcc: element.entreprise_mail,
          html: emailTemplate,
          attachments: [
            {
              path: 'https://firebasestorage.googleapis.com/v0/b/organisation-chat.appspot.com/o/CV_french_Mohamed_Birali_front_end_developer.pdf?alt=media&token=c265102e-4dbf-44a4-8ab7-29ab78c813b2',
            },
          ],
        });

        console.log(mail);

        await this._emailRepo.updateAttempts(
          element.entreprise_mail,
          element.send_attempts! + 1,
        );

        console.log(element.entreprise_mail + ' was sent');
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('All mails just fine');
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    console.log(job.failedReason, job.isDelayed(), job.getState());
  }

  @OnWorkerEvent('error')
  onError(job: Job) {
    console.log('error occured');
    console.log(job.failedReason, job.isDelayed(), job.getState());
  }

  async #_emailTemplate(cv: TCvProposalEntity) {
    return template(cv, this._helperDateService.format(new Date()));
  }
}
