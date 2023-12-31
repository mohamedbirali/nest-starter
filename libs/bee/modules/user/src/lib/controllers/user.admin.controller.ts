import { TUserEntity } from '@bee/common/types';
import { UserService } from './../services/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ENUM_LOGGER_ACTION,
  ENUM_LOGGER_LEVEL,
  LoggerDecorator,
} from '@bee/common/logger';
import { UserCreateDto } from '../dtos/user.create.dto';

@Controller('user')
export class UserAdminController {
  constructor(private readonly _userService: UserService) {}

  @Post('create')
  @LoggerDecorator(ENUM_LOGGER_ACTION.TEST)
  create(@Body() user: UserCreateDto) {
    return this._userService.create(user);
  }

  @Get(':id')
  @LoggerDecorator(ENUM_LOGGER_ACTION.TEST)
  getUser(@Param('id') id: number) {
    return this._userService.getUserById(+id);
  }

  @Get()
  @LoggerDecorator(ENUM_LOGGER_ACTION.TEST)
  getAll() {
    return this._userService.getAll();
  }

  @Put('update')
  @LoggerDecorator(ENUM_LOGGER_ACTION.TEST)
  update(@Body() user: Partial<TUserEntity>) {
    return this._userService.update(user);
  }

  @Delete(':id')
  @LoggerDecorator(ENUM_LOGGER_ACTION.TEST)
  deleteUser(@Param('id') id: number) {
    return this._userService.delete(+id);
  }
}
