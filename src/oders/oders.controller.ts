import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OdersService } from './oders.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';

@Controller('oders')
export class OdersController {
  constructor(private readonly odersService: OdersService) {}

  @Get('/:user/:id')
  @UseGuards(AuthGuard('jwt'))
  async findById(@Param() Param: any) {
    return this.odersService.findById(Param.id, Param.user);
  }

  @Get('/:user')
  @UseGuards(AuthGuard('jwt'))
  async findByUser(@Param() Param: any) {
    return this.odersService.findByUser(Param.user);
  }

  @Post('/:user')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() cart: any, @Param() Param: any) {
    return this.odersService.createOders(cart, Param.user, uuidv4());
  }

  @Put('/:user/:idOder/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() cart: any, @Param() Param: any, @Request() req) {
    if (req.user.username !== Param.user) {
      return this.odersService.updateOders(
        Param.id,
        cart,
        Param.user,
        Param.idOder,
      );
    } else {
      return 'You are not owner of this oders';
    }
  }

  @Delete('/:user/:idOder/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() Param: any, @Request() req) {
    if (req.user.username !== Param.user) {
      return this.odersService.deleteOders(Param.id, Param.user, Param.idOder);
    } else {
      return 'You are not owner of this oders';
    }
  }
}
