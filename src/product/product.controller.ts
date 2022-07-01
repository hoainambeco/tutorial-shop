import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async insert(@Body() product: any, @Request() req) {
    if (req.user.role === 'Admin') {
      return await this.productService.creatProduct(product);
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }
  @Get('/:id')
  async findById(@Param() Param) {
    return await this.productService.findById(Param.id);
  }
  @Put('/:id')
  async update(@Param() Param, @Body() product: any, @Request() req) {
    if (req.user.role === 'Admin') {
      return await this.productService.updateProduct(Param.id, product);
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }

  @Delete('/:id')
  async delete(@Param() Param, @Request() req) {
    if (req.user.role === 'Admin') {
      return await this.productService.deleteProduct(Param.id);
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }
}
