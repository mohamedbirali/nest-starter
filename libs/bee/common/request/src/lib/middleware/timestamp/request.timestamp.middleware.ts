import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { HelperDateService } from '@bee/common/helper'; ///services/helper.date.service';
import { HelperNumberService } from '@bee/common/helper'; ///services/helper.number.service';
import { IRequestApp } from '../../interfaces/request.interface';

@Injectable()
export class RequestTimestampMiddleware implements NestMiddleware {
  constructor(
    private readonly helperNumberService: HelperNumberService,
    private readonly helperDateService: HelperDateService,
  ) {}

  async use(
    req: IRequestApp,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    req.__xTimestamp = req['__xTimestamp']
      ? this.helperNumberService.create(req['__xTimestamp'] + '')
      : undefined;
    req.__timestamp = this.helperDateService.timestamp();
    next();
  }
}
