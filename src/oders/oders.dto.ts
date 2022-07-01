import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';

@InputType()
export class OdersDto {
  @Field()
  @IsNotEmpty()
  id: string;
  // @Field()
  // @IsNotEmpty()
  // productName: string;
  // @Field()
  // @IsNotEmpty()
  // price: number;
  // @Field()
  // @IsNotEmpty()
  // quantity: number;
  @Field((type) => Cart)
  product: Cart;
}
