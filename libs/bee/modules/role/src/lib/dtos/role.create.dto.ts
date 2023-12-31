import {
  ENUM_POLICY_ACTION,
  ENUM_POLICY_SUBJECT,
  ENUM_ROLE_TYPE,
} from '@bee/common/policy';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { RoleUpdateDto } from './role.update.dto';
import { PartialType } from '@nestjs/swagger';

class RolePermissionsDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ENUM_POLICY_SUBJECT)
  subject: ENUM_POLICY_SUBJECT;

  @IsString({ each: true })
  @IsEnum(ENUM_POLICY_ACTION, { each: true })
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  action: ENUM_POLICY_ACTION[];
}

export class RoleCreateDto extends PartialType(RoleUpdateDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Type(() => String)
  readonly name: string;

  @IsEnum(ENUM_ROLE_TYPE)
  @IsNotEmpty()
  readonly type: ENUM_ROLE_TYPE;

  @Type(() => RolePermissionsDto)
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @ValidateIf((e) => e.type === ENUM_ROLE_TYPE.ADMIN)
  @Transform(({ value, obj }) =>
    obj.type !== ENUM_ROLE_TYPE.ADMIN ? [] : value,
  )
  readonly permissions: RolePermissionsDto[];
}
