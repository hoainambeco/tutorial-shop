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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductTypeInput } from './dto/productType';
import { ProductTypeService } from './product-type.service';

@Controller('product-type')
@ApiTags('ProductType')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.productTypeService.findAll();
  }
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async insert(@Body() productType: ProductTypeInput, @Request() req) {
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
  @ApiParam({ name: 'id' })
  async findById(@Param() Param) {
    return await this.productTypeService.findById(Param.id);
  }
  @Put('/:id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param() Param,
    @Body() productType: ProductTypeInput,
    @Request() req,
  ) {
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
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
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
