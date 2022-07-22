import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async findAllByPostId(id: number): Promise<Comment[]> {
    console.log(id);
    return this.commentRepository.findBy({ idPost: id });
  }

  async findById(id: number): Promise<Comment> {
    return await this.commentRepository.findOneBy({ id });
  }
  async createComment(commentInput: CommentDto): Promise<Comment> {
    return this.commentRepository.save(commentInput);
  }
  async updateComment(id: number, commentInput: Comment): Promise<Comment> {
    const { content } = commentInput;
    const comment = await this.commentRepository.findOneBy({ id });
    const updateComment = {
      content: content,
      idPost: comment.idPost,
      idUser: comment.idUser,
    };
    await this.commentRepository.update(id, updateComment);
    return await this.commentRepository.findOneBy({ id: id });
  }
  async deleteComment(id: number): Promise<boolean> {
    await this.commentRepository.delete(id);
    return true;
  }
  async DeleteAllByPostId(id: number): Promise<boolean> {
    await this.commentRepository.delete({ idPost: id });
    return true;
  }
}
