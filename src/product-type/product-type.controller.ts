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
} from '@nestjs/common';
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
  async insert(@Body() productType: any) {
    return await this.productTypeService.creatProductType(productType);
  }

  @Get('/:id')
  async findById(@Param() Param) {
    return await this.productTypeService.findById(Param.id);
  }
  @Put('/:id')
  async update(@Param() Param, @Body() productType: any) {
    return await this.productTypeService.updateProductType(
      Param.id,
      productType,
    );
  }
  @Delete('/:id')
  async delete(@Param() Param) {
    return await this.productTypeService.deleteProductType(Param.id);
  }
}
