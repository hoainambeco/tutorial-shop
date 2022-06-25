import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CommentDto {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  idPost: number;

  @Field()
  @IsNotEmpty()
  idUser: number;
}
