import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentDto } from './comment.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Query((returns) => [Comment])
  async commentsQueryAllByPostId(@Args('postId') id: number) {
    return this.commentService.findAllByPostId(id);
  }

  @Mutation((returns) => Comment)
  async createComment(@Args('comment') commentInput: CommentDto) {
    return this.commentService.createComment(commentInput);
  }

  @Mutation((returns) => Comment)
  async updateComment(
    @Args('id') id: number,
    @Args('comment') commentInput: CommentDto,
  ) {
    return this.commentService.updateComment(id, commentInput);
  }

  @Mutation((returns) => Boolean)
  async deleteComment(@Args('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
