import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsDto } from './posts.dto';
import { Post } from './posts.entity';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostsService) {}
  @Query((returns) => Post)
  post(@Args('id') id: number) {
    return this.postService.findById(id);
  }
  @Query((returns) => [Post])
  postsQueryAll() {
    return this.postService.findAll();
  }
  @Mutation((returns) => Post)
  createPost(@Args('post') postInput: PostsDto) {
    return this.postService.creatPost(postInput);
  }
  @Mutation((returns) => Post)
  updatePost(@Args('id') id: number, @Args('post') postInput: PostsDto) {
    return this.postService.updatePost(id, postInput);
  }
  @Mutation((returns) => Boolean)
  deletePost(@Args('id') id: number) {
    return this.postService.deletePost(id);
  }
}
