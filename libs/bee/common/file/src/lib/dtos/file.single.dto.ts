import { ApiProperty } from '@nestjs/swagger';
import { IFile } from '../interfaces/file.interface';

export class FileSingleDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Single file',
  })
  file: IFile;
}
