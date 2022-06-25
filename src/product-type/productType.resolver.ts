import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductTypeInput } from './dto/productType';
import { ProductType } from './entity/productType.entity';
import { ProductTypeService } from './product-type.service';

@Resolver((of) => ProductType)
export class ProductTypeResolver {
  constructor(private readonly productTypeService: ProductTypeService) {}
  @Query((returns) => ProductType)
  productTypes(@Args('id') id: number) {
    console.log(this.productTypeService.findById(id));
    return this.productTypeService.findById(id);
  }
  @Query((returns) => [ProductType])
  productTypesQueryAll() {
    console.log(this.productTypeService.findAll());
    return this.productTypeService.findAll();
  }
  @Mutation((returns) => ProductType)
  createProductType(@Args('productType') productTypeInput: ProductTypeInput) {
    return this.productTypeService.creatProductType(productTypeInput);
  }
  @Mutation((returns) => ProductType)
  updateProductType(
    @Args('id') id: number,
    @Args('productType') productTypeInput: ProductTypeInput,
  ) {
    return this.productTypeService.updateProductType(id, productTypeInput);
  }
  @Mutation((returns) => Boolean)
  deleteProductType(@Args('id') id: number) {
    return this.productTypeService.deleteProductType(id);
  }
}
