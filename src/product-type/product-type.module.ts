import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entity/productType.entity';
import { ProductTypeResolver } from './productType.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  providers: [ProductTypeService, ProductTypeResolver],
  controllers: [ProductTypeController],
})
export class ProductTypeModule {}
