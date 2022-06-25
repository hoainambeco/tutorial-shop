import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ProductInput {
  @Field()
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  price: number;

  @Field()
  count: number;

  @Field()
  description: string;
}
