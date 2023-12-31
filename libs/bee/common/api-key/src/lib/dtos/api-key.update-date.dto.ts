import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsISO8601, IsNotEmpty } from 'class-validator';
import {
  GreaterThanEqual,
  DateGreaterThanEqualToday,
} from '@bee/common/request';

export class ApiKeyUpdateDateDto {
  @ApiProperty({
    description: 'Api Key start date',
    example: faker.date.recent(),
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  @IsISO8601()
  @DateGreaterThanEqualToday()
  startDate: Date;

  @ApiProperty({
    description: 'Api Key end date',
    example: faker.date.recent(),
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  @IsISO8601()
  @GreaterThanEqual('startDate')
  endDate: Date;
}
