import {
  IHelperFileWriteExcelOptions,
  IHelperFileReadExcelOptions,
  IHelperFileRows,
  IHelperFileCreateExcelWorkbookOptions,
} from '../interfaces/helper.interface';
import { WorkBook } from 'xlsx';

export interface IHelperFileService {
  createExcelWorkbook(
    rows: IHelperFileRows[],
    options?: IHelperFileCreateExcelWorkbookOptions,
  ): WorkBook;
  writeExcelToBuffer(
    workbook: WorkBook,
    options?: IHelperFileWriteExcelOptions,
  ): Buffer;
  readExcelFromBuffer(
    file: Buffer,
    options?: IHelperFileReadExcelOptions,
  ): IHelperFileRows[][];
  convertToBytes(megabytes: string): number;
  createJson(path: string, data: Record<string, any>[]): boolean;
  readJson(path: string): Record<string, any>[];
}
