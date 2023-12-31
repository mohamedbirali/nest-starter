import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
  ValidateIf,
  IsNumber,
} from 'class-validator';
import { IsPasswordStrong, MobileNumberAllowed } from '@bee/common/request';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @Type(() => String)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @Type(() => String)
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(14)
  @ValidateIf((e) => e.mobileNumber !== '')
  @Type(() => String)
  @MobileNumberAllowed()
  readonly mobileNumber?: string;

  @IsNumber()
  @ValidateIf((e) => e.role !== undefined)
  @Type(() => Number)
  readonly role: number;

  @IsNotEmpty()
  @IsPasswordStrong()
  @MaxLength(50)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly signUpFrom: string;
}
