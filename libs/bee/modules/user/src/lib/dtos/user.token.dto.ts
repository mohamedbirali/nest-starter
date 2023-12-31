import { IsNotEmpty, IsString } from 'class-validator';

export class UserTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
