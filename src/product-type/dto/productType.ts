import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ProductTypeInput {
  @Field()
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  description: string;
}
