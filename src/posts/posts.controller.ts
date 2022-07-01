import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get('/:id')
  async findById(@Param() Param) {
    return await this.postsService.findById(Param.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async insert(@Body() post: any) {
    return await this.postsService.creatPost(post);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param() Param, @Body() post: any, @Request() req) {
    console.log(req.user);
    const posta = await this.postsService.findById(Param.id);
    if (posta.idUser === req.user.user_id || req.user.role === 'Admin') {
      return await this.postsService.updatePost(Param.id, post);
    }
    return 'You are not authorized to update this post';
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() Param, @Request() req) {
    console.log(req.user);
    const posta = await this.postsService.findById(Param.id);
    if (posta.idUser === req.user.user_id || req.user.role === 'Admin') {
      return await this.postsService.deletePost(Param.id);
    }
    return 'You are not authorized to update this post';
  }
}
