import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<UserDto[]> {
    return (await this.userService.findAll()) as UserDto[];
  }
  @Get(':id')
  async findById(@Param() Param): Promise<UserDto> {
    return (await this.userService.findById(Param.id)) as UserDto;
  }
  @Post()
  @UsePipes(ValidationPipe)
  async insert(@Body() user: UserDto): Promise<UserDto> {
    return (await this.userService.insert(user)) as
      | UserDto
      | { message: string }
      | any;
  }
  @Post('login')
  async login(@Body() user: UserDto): Promise<UserDto> {
    return (await this.userService.login(user)) as
      | UserDto
      | { message: string }
      | any;
  }
  @Put(':id')
  async update(@Body() updateUser: UserDto, @Param() params): Promise<UserDto> {
    const oldUser = await this.userService.findById(params.id);
    return await this.userService.update(oldUser, updateUser, params);
  }
  @Delete(':id')
  async delete(@Param() Param): Promise<UserDto> {
    return (await this.userService.delete(Param.id)) as UserDto;
  }
}
