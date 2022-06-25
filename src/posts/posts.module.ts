import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService, PostResolver],
  controllers: [PostsController],
})
export class PostsModule {}
