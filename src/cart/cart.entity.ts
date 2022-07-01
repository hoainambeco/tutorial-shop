import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Cart')
export class Cart {
  @Field((type) => ID)
  id: string;
  @Field()
  nameProduct: string;
  @Field()
  price: number;
  @Field()
  count: number;
}
