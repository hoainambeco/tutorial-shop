import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cart } from 'src/cart/cart.entity';

@ObjectType('Order')
export class Oders {
  @Field((type) => ID)
  id: string;
  // @Field()
  // productName: string;
  // @Field()
  // price: number;
  // @Field()
  // quantity: number;
  @Field((type) => Cart)
  product: Cart;
}
