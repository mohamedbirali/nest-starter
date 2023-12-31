import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleRequestDto {
  @IsNotEmpty()
  @IsNumber()
  role: number;
}
