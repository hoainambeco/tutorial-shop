import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cart } from '../cart/cart.entity';

@ObjectType('Order')
export class Oders {
  @Field((type) => ID)
  id: string;
  @Field((type) => Cart)
  product: Cart;
}
