import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { MessageService } from '../services/message.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: '/message',
})
export class MessagePublicController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/languages')
  async languages() {
    const languages: string[] = this.messageService.getAvailableLanguages();

    return {
      data: { languages },
    };
  }
}
