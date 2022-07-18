import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CartDto {
  @Field()
  @ApiProperty({ type: String })
  id: string;

  @Field()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ type: String })
  nameProduct: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  price: number;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  count: number;
}
