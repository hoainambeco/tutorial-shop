import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Res() response: Response): Promise<UserDto[]> {
    response.status(200).send(await this.userService.findAll());
    return (await this.userService.findAll()) as UserDto[];
  }
  @Get(':id')
  async findById(@Param() Param, @Res() response: Response): Promise<UserDto> {
    response.status(200).send(await this.userService.findById(Param.id));
    return (await this.userService.findById(Param.id)) as UserDto;
  }
  @Post()
  @UsePipes(ValidationPipe)
  async insert(@Body() user: UserDto, @Res() response: Response) {
    console.log(user);
    if (await this.userService.insert(user)) {
      response.status(201).send({ message: 'User created' });
      return user;
    } else {
      response.status(400).send({ message: 'User already exists' });
    }
  }
  @Post('login')
  async login(@Body() user: UserDto): Promise<UserDto> {
    return (await this.userService.login(user)) as
      | UserDto
      | { message: string }
      | any;
  }
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Body() updateUser: UserDto,
    @Param() params,
    @Res() response: Response,
    @Request() req,
  ) {
    if (req.user.role === 'Admin') {
      try {
        await this.userService.update(updateUser, params);
        response.status(200).send(updateUser);
        return updateUser;
      } catch (error) {
        response.status(400).send({ message: 'User already exists' });
      }
    }
    return { message: 'You are not authorized to perform this action' };
  }
  @Delete(':id')
  async delete(@Param() Param, @Request() req) {
    if (req.user.role === 'Admin') {
      return (await this.userService.delete(Param.id)) as UserDto;
    }

    return { message: 'You are not authorized to perform this action' };
  }
}
