import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ImageDto {
  @Field()
  @ApiProperty({ type: String })
  id: string;

  @Field()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String })
  url: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  idPost: number;
}
