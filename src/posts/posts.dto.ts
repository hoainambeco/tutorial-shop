import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class PostsDto {
  @Field()
  @ApiProperty({ type: Number })
  id: number;

  @Field()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String })
  title: string;

  @Field()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String })
  content: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  idProduct: number;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  idProductType: number;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  idUser: number;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  createAt: Date;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  updateAt: Date;
}
