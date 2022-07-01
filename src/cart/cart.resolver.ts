import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartDto } from './cart.Dto';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Resolver((of) => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}
  @Query((returns) => [Cart])
  cartsUser() {
    return this.cartService.findAll();
  }
  @Query((returns) => Cart)
  cart(@Args('id') id: string, @Args('user') user: string) {
    return this.cartService.findById(id, user);
  }

  @Query((returns) => [Cart])
  cartsByUser(@Args('user') user: string) {
    return this.cartService.findByUser(user);
  }
  @Mutation((returns) => Cart)
  createCart(@Args('cart') cart: CartDto, @Args('user') user: string) {
    return this.cartService.createCart(cart, user);
  }
  @Mutation((returns) => Cart)
  updateCart(
    @Args('id') id: string,
    @Args('user') user: string,
    @Args('cart') cart: CartDto,
  ) {
    return this.cartService.updateCart(id, user, cart);
  }
  @Mutation((returns) => Boolean)
  deleteCart(@Args('id') id: string, @Args('user') user: string) {
    return this.cartService.deleteCart(id, user);
  }
}
