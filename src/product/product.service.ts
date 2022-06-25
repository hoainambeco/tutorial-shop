import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInput } from './product.dto';
import { Product } from './product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneBy({ id: id });
    } catch (error) {
      console.log(error);
    }
  }
  async creatProduct(ProductInput: ProductInput): Promise<Product> {
    try {
      const { name, price, count, description } = ProductInput;
      const product = this.productRepository.create({
        name,
        price,
        count,
        description,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(
    id: number,
    ProductInput: ProductInput,
  ): Promise<Product> {
    try {
      const { name, price, count, description } = ProductInput;
      await this.productRepository.update(id, {
        name,
        price,
        count,
        description,
      });
      return await this.productRepository.findOneBy({ id: id });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id: number): Promise<boolean> {
    try {
      await this.productRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
