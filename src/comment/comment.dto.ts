import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CommentDto {
  @ApiProperty({ type: Number })
  @Field()
  id: number;

  @Field()
  @ApiProperty({ type: String })
  @IsNotEmpty()
  content: string;

  @Field()
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  idPost: number;

  @Field()
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  idUser: number;
}
