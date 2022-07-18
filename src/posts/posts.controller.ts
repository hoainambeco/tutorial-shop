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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostsDto } from './posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    const data = await this.postsService.findAll();
    console.log(data);

    return data;
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  async findById(@Param() Param) {
    return await this.postsService.findById(Param.id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async insert(@Body() post: PostsDto) {
    const data = await this.postsService.creatPost(post);
    console.log(data);
    return data;
  }

  @Put('/:id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@Param() Param, @Body() post: PostsDto, @Request() req) {
    console.log(req.user);
    const posta = await this.postsService.findById(Param.id);
    if (posta.idUser === req.user.user_id || req.user.role === 'Admin') {
      return await this.postsService.updatePost(Param.id, post);
    }
    return 'You are not authorized to update this post';
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
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
