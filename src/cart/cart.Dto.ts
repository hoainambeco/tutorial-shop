import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CartDto {
  @Field()
  id: string;

  @Field()
  @MinLength(3)
  @IsNotEmpty()
  nameProduct: string;

  @Field()
  @IsNotEmpty()
  price: number;

  @Field()
  @IsNotEmpty()
  count: number;
}
