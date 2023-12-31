import { ValidationError } from '@nestjs/common';
// import {
//     IErrors,
//     IErrorsImport,
//     IValidationErrorImport,
// } from '@bee/common/error'; //interfaces/error.interface';
import {
  IMessageErrorOptions,
  IMessageOptions,
  IMessageSetOptions,
} from '../interfaces/message.interface';

export interface IMessageService {
  getAvailableLanguages(): string[];
  getLanguage(): string;
  filterLanguage(customLanguages: string[]): string[];
  setMessage(lang: string, key: string, options?: IMessageSetOptions): string;
  getRequestErrorsMessage(
    requestErrors: ValidationError[],
    options?: IMessageErrorOptions,
  ): Array<any>;
  getImportErrorsMessage(
    errors: Array<any>,
    options?: IMessageErrorOptions,
  ): Array<any>;
  get<T = string>(key: string, options?: IMessageOptions): T;
}
