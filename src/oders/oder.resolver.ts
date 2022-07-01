import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartDto } from 'src/cart/cart.Dto';
import { Oders } from './oders.entity';
import { OdersService } from './oders.service';

@Resolver()
export class OdersResolver {
  constructor(private readonly odersService: OdersService) {}
  @Query((returns) => [Oders])
  oders(@Args('id') id: string, @Args('user') user: string) {
    return this.odersService.findById(id, user);
  }
  @Query((returns) => [Oders])
  odersByUser(@Args('oder') user: string) {
    return this.odersService.findByUser(user);
  }
  @Mutation((returns) => Oders)
  createOders(
    @Args('oder') product: CartDto,
    @Args('user') user: string,
    @Args('idOder') idOder: string,
  ) {
    return this.odersService.createOders(product, user, idOder);
  }
  @Mutation((returns) => Oders)
  updateOders(
    @Args('id') id: string,
    @Args('user') user: string,
    @Args('oder') product: CartDto,
    @Args('idOder') idOder: string,
  ) {
    return this.odersService.updateOders(id, product, user, idOder);
  }
  @Mutation((returns) => Boolean)
  deleteOders(
    @Args('id') id: string,
    @Args('user') user: string,
    @Args('idOder') idOder: string,
  ) {
    return this.odersService.deleteOders(id, user, idOder);
  }
}
