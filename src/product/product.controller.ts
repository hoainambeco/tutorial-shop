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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductInput } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async insert(@Body() product: ProductInput, @Request() req) {
    if (req.user.role === 'Admin') {
      return await this.productService.creatProduct(product);
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }
  @Get('/:id')
  @ApiParam({ name: 'id' })
  async findById(@Param() Param) {
    return await this.productService.findById(Param.id);
  }
  @Put('/:id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@Param() Param, @Body() product: ProductInput, @Request() req) {
    if (req.user.role === 'Admin') {
      return await this.productService.updateProduct(Param.id, product);
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
