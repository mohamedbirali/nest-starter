import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserChangePasswordDto } from '../dtos/user.change-password.dto';
import { UserRegisterDto } from '../dtos/user.register.dto';
import { UserLoginDto } from '../dtos/user.login.dto';
import { UserTokenDto } from '../dtos/user.token.dto';
import { UserAuthService } from '../services/user.auth.service';
import { IResponse, Response } from '@bee/common/response';
import { AuthJwtAccessProtected } from '@bee/common/auth';
import { GetUser } from '../decorators';

@Controller('user')
export class UserAuthController {
  constructor(private readonly _userAuthService: UserAuthService) {}

  @Post('register')
  @Response('user.register')
  async register(@Body() user: UserRegisterDto): Promise<IResponse> {
    return await this._userAuthService.register(user);
  }

  @Get('activate-account')
  @Response('user.activate-account')
  async activateAccount(@Query('token') token: string): Promise<IResponse> {
    return await this._userAuthService.activateAccount(token);
  }

  @Post('login')
  @Response('user.login')
  async login(@Body() user: UserLoginDto): Promise<IResponse> {
    return await this._userAuthService.login(user);
  }

  @Put('change-password')
  @AuthJwtAccessProtected()
  @Response('user.change-password')
  async changePassword(
    @Body() pwd: UserChangePasswordDto,
    @GetUser() email: string,
  ): Promise<IResponse> {
    return await this._userAuthService.changePassword(pwd, email);
  }

  @Put('reset-password')
  resetPassword(pwd: UserChangePasswordDto) {
    return pwd;
  }

  @Post('refresh')
  refresh(token: UserTokenDto) {
    // refresh token from database.
    return token;
  }

  // profile
  @Get('profile')
  profile() {
    return 'profile';
  }

  @Put('update-profile')
  updateProfile() {
    return 'updateProfile';
  }

  @Get('token-info')
  tokenInfo(token: UserTokenDto) {
    return token;
  }

  @Put('revoke-token/:id')
  revokeToken(@Param('id') id: string) {
    return id;
  }

  @Post('logout')
  logout(token: UserTokenDto) {
    return token;
  }

  @Delete('delete-all-users')
  deleteAllUsers() {
    return this._userAuthService.deleteAllUsers();
  }
}
