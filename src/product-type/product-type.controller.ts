import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductTypeService } from './product-type.service';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.productTypeService.findAll();
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async insert(@Body() productType: any, @Request() req) {
    console.log(req.user.user_id);
    if (req.user.role === 'Admin') {
      return await this.productTypeService.creatProductType(productType);
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }

  @Get('/:id')
  async findById(@Param() Param) {
    return await this.productTypeService.findById(Param.id);
  }
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param() Param, @Body() productType: any, @Request() req) {
    if (req.user.role === 'Admin') {
      return await this.productTypeService.updateProductType(
        Param.id,
        productType,
      );
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() Param, @Request() req) {
    if (req.user.role === 'Admin') {
      return await this.productTypeService.deleteProductType(Param.id);
    } else {
      return {
        message: 'You are not authorized to perform this action',
      };
    }
  }
}
