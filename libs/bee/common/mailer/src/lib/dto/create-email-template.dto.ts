import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EmailTemplateCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'maxLength-{"ln":100,"count":100}',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  sender: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(50, {
    message: 'minLength-{"ln":50,"count":50}',
  })
  body: string;

  @IsOptional()
  @IsBoolean()
  isDefault: boolean;

  slug: string;
}
