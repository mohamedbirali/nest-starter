import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { IsPasswordStrong } from '@bee/common/request';

export class UserChangePasswordDto {
  @IsPasswordStrong()
  @IsNotEmpty()
  @MaxLength(50)
  readonly newPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;
}
