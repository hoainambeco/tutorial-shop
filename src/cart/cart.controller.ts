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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartDto } from './cart.Dto';
import { CartService } from './cart.service';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.cartService.findAll();
  }

  @Get('/:id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findById(@Param() param) {
    return await this.cartService.findById(param.id, param.user);
  }

  @Get('/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findByPost(@Param() param) {
    return await this.cartService.findByUser(param.user);
  }

  @Post(':user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createCart(@Param() param, @Body() cart: CartDto): Promise<CartDto> {
    return await this.cartService.createCart(cart, param.user);
  }

  @Put('/:id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateCart(@Param() param, @Body() cart: CartDto, @Request() req) {
    if (req.user.username !== param.user) {
      return 'You are not authorized to update this cart';
    } else return await this.cartService.updateCart(param.id, param.user, cart);
  }

  @Delete('/:id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteCart(@Param() param, @Request() req) {
    if (req.user.username !== param.user) {
      return 'You are not authorized to update this cart';
    } else return await this.cartService.deleteCart(param.id, param.user);
  }
}
