import { faker } from '@faker-js/faker';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiKeyUpdateDateDto } from './api-key.update-date.dto';
import { ENUM_API_KEY_TYPE } from '../constants/api-key.enum.constant';

export class ApiKeyCreateDto extends PartialType(ApiKeyUpdateDateDto) {
  @ApiProperty({
    description: 'Api Key name',
    example: `testapiname`,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Api Key name',
    example: ENUM_API_KEY_TYPE.PUBLIC,
    required: true,
    enum: ENUM_API_KEY_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(ENUM_API_KEY_TYPE)
  type: ENUM_API_KEY_TYPE;
}

export class ApiKeyCreateRawDto extends ApiKeyCreateDto {
  @ApiProperty({
    name: 'key',
    example: faker.string.alphanumeric(10),
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  key: string;

  @ApiProperty({
    name: 'secret',
    example: faker.string.alphanumeric(20),
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  secret: string;
}
