import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductInput } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  @Query((returns) => Product)
  product(@Args('id') id: number) {
    return this.productService.findById(id);
  }
  @Query((returns) => [Product])
  productsQueryAll() {
    return this.productService.findAll();
  }
  @Mutation((returns) => Product)
  createProduct(@Args('product') productInput: ProductInput) {
    return this.productService.creatProduct(productInput);
  }
  @Mutation((returns) => Product)
  updateProduct(
    @Args('id') id: number,
    @Args('product') productInput: ProductInput,
  ) {
    return this.productService.updateProduct(id, productInput);
  }
  @Mutation((returns) => Boolean)
  deleteProduct(@Args('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
