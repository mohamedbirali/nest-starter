import { Controller, Get } from '@nestjs/common';

@Controller()
export class TestController {
  @Get('test')
  testMe() {
    return 'works';
  }
}
