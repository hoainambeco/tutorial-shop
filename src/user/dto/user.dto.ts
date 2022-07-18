import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

@InputType()
export class UserDto {
  @Field()
  @ApiProperty({ type: Number })
  user_id: number;

  @IsNotEmpty()
  @MinLength(3)
  @Field()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @Field()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Field()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @ApiProperty({ type: String })
  password: string;

  @Field()
  @ApiProperty({ type: String })
  role: string;
}
@InputType()
export class Login {
  @Field()
  @ApiProperty({ type: String })
  username: string;

  @Field()
  @ApiProperty({ type: String })
  password: string;
}
