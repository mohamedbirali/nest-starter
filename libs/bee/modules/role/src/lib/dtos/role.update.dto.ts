import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RoleUpdateDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly description: string;
}
