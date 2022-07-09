import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTypeInput } from './dto/productType';
import { ProductType } from './entity/productType.entity';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productRepository: Repository<ProductType>,
  ) {}

  async findAll(): Promise<ProductType[]> {
    try {
      console.log(this.productRepository);

      return await this.productRepository.find();
    } catch (error) {
      return error;
    }
  }

  async findById(id: number): Promise<ProductType> {
    try {
      return await this.productRepository.findOneBy({ id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async creatProductType(
    ProductTypeInput: ProductTypeInput,
  ): Promise<ProductType> {
    try {
      const { name, description } = ProductTypeInput;
      const productType = this.productRepository.create({
        name,
        description,
      });
      return await this.productRepository.save(productType);
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductType(
    id: number,
    ProductTypeInput: ProductTypeInput,
  ): Promise<ProductType> {
    try {
      const { name, description } = ProductTypeInput;
      await this.productRepository.update(id, {
        name,
        description,
      });
      return await this.productRepository.findOneBy({ id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductType(id: number): Promise<boolean> {
    try {
      await this.productRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
