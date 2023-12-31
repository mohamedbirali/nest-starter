import { IsPasswordStrong } from '@bee/common/request';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  readonly username: string;
  @IsNotEmpty()
  @IsPasswordStrong()
  @MaxLength(50)
  readonly password: string;
}
