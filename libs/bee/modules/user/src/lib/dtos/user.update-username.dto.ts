import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserUpdateUsernameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  readonly username: string;
}
