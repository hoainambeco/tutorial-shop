import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:idPost')
  getComments(@Param('idPost') Param) {
    return this.commentService.findAllByPostId(Param.idPost);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createComment(@Body() commentInput: any) {
    return this.commentService.createComment(commentInput);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateComment(
    @Param() Param,
    @Body() commentInput: any,
    @Request() req,
  ) {
    const comment = await this.commentService.findById(Param.id);
    if (req.user.user_id === comment.idUser) {
      return this.commentService.updateComment(Param.id, commentInput);
    } else {
      return 'You are not allowed to update this comment';
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Param() Param, @Request() req) {
    const comment = await this.commentService.findById(Param.id);
    if (req.user.user_id === comment.idUser || req.user.role === 'Admin') {
      return this.commentService.deleteComment(Param.id);
    } else {
      return 'You are not allowed to update this comment';
    }
  }
}
