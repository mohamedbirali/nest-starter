import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailTemplateCreateDto } from './dto/create-email-template.dto';
import { EmailTemplateService } from './email-template.service';
import { CvProposalDto } from './dto/cv.proposal.dto';

@ApiTags('email-templates')
@Controller('email-templates')
export class EmailTemplateController {
  constructor(private readonly _emailTemplateService: EmailTemplateService) {}

  @Post('create')
  create(@Body() email: EmailTemplateCreateDto) {
    return this._emailTemplateService.create(email);
  }

  @Get('email')
  async sendTokenActivateAccount() {
    return await this._emailTemplateService.sendTokenActivateAccount(
      'token',
      'mohamed.birali01@gmail.com',
    );
  }

  @Post('create-cv-proposal')
  async createCvProposal(@Body() cvPropsal: CvProposalDto) {
    return await this._emailTemplateService.createCvProposal(cvPropsal);
  }

  @Post('send-cv-proposals')
  async sendCvProposals() {
    return await this._emailTemplateService.sendCvProposals();
  }

  @Post('send-cv-proposal/:email')
  async sendCvProposal(@Param('email') email: string) {
    return await this._emailTemplateService.sendProposalByEmail(email);
  }

  @Put('update-cv-proposal')
  async updateCvProposal() {
    return await this._emailTemplateService.updateCvProposal();
  }
}
