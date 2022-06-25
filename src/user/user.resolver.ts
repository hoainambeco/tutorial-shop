import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query((returns) => User)
  user(@Args('id') id: number) {
    console.log(this.userService.findById(id));

    return this.userService.findById(id);
  }
  @Mutation((returns) => User)
  createUser(@Args('user') user: UserDto) {
    return this.userService.creatUser(user);
  }
  @Mutation((returns) => User)
  updatePassword(
    @Args('id') id: number,
    @Args('oldPassword') password: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.userService.updatePassword(id, password, newPassword);
  }
  @Mutation((returns) => Boolean)
  deleteUser(@Args('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
