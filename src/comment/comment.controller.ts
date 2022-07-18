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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
@ApiTags('comment')
// @ApiBearerAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:idPost')
  getComments(@Param('idPost') Param): Promise<CommentDto[]> {
    return this.commentService.findAllByPostId(Param.idPost);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createComment(@Body() commentInput: CommentDto): Promise<CommentDto> {
    return this.commentService.createComment(commentInput);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateComment(
    @Param() Param,
    @Body() commentInput: CommentDto,
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
  @ApiBearerAuth()
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
