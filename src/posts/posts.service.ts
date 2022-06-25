import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postRepository.find();
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: number): Promise<Post> {
    try {
      return await this.postRepository.findOneBy({ id: id });
    } catch (error) {
      console.log(error);
    }
  }
  async creatPost(postInput: Post): Promise<Post> {
    try {
      const {
        title,
        content,
        idProduct,
        idProductType,
        idUser,
        createAt,
        updateAt,
      } = postInput;
      const post = this.postRepository.create({
        title,
        content,
        idProduct,
        idProductType,
        idUser,
        createAt,
        updateAt,
      });
      post.createAt = new Date();
      post.updateAt = new Date();
      return await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(id: number, postInput: Post): Promise<Post> {
    try {
      const { title, content, idProduct, idProductType, idUser } = postInput;
      const post = await this.postRepository.findOneBy({ id: id });
      const updatePost = {
        title: title || post.title,
        content: content || post.content,
        idProduct: idProduct || post.idProduct,
        idProductType: idProductType || post.idProductType,
        idUser: idUser || post.idUser,
        createAt: post.createAt,
        updateAt: new Date(),
      };
      await this.postRepository.update(id, updatePost);
      return await this.postRepository.findOneBy({ id: id });
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(id: number): Promise<boolean> {
    try {
      await this.postRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
