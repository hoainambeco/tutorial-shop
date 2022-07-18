import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';

@InputType()
export class OdersDto {
  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;
  @Field((type) => Cart)
  @ApiProperty({ type: Cart })
  product: Cart;
}
