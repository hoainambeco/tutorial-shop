import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ImageDto {
  @Field()
  id: string;

  @Field()
  @IsNotEmpty()
  @MinLength(3)
  url: string;

  @Field()
  @IsNotEmpty()
  idPost: number;
}
