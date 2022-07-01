import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

@InputType()
export class UserDto {
  @Field()
  user_id: number;

  @IsNotEmpty()
  @MinLength(3)
  @Field()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @Field()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Field()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @Field()
  role: string;
}
