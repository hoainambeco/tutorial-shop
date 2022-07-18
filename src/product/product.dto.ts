import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ProductInput {
  @Field()
  @ApiProperty({ type: Number })
  id: number;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @Field()
  @ApiProperty({ type: Number })
  price: number;

  @Field()
  @ApiProperty({ type: Number })
  count: number;

  @Field()
  @ApiProperty({ type: String })
  description: string;
}
