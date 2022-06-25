import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class PostsDto {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Field()
  @IsNotEmpty()
  @MinLength(3)
  content: string;

  @Field()
  @IsNotEmpty()
  idProduct: number;

  @Field()
  @IsNotEmpty()
  idProductType: number;

  @Field()
  @IsNotEmpty()
  idUser: number;
}
