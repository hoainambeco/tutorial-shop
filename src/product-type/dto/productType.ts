import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ProductTypeInput {
  @Field()
  @ApiProperty({ type: String })
  id: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @Field()
  @ApiProperty({ type: String })
  description: string;
}
