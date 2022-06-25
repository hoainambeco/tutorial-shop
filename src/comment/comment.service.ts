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
    return this.commentRepository.findBy({ idPost: id });
  }
  async createComment(commentInput: CommentDto): Promise<Comment> {
    const { content, idPost, idUser } = commentInput;
    const comment = this.commentRepository.create({
      content,
      idPost,
      idUser,
    });
    return await this.commentRepository.save(comment);
  }
  async updateComment(id: number, commentInput: CommentDto): Promise<Comment> {
    const { content, idPost, idUser } = commentInput;
    await this.commentRepository.update(id, {
      content,
      idPost,
      idUser,
    });
    return await this.commentRepository.findOneBy({ id: id });
  }
  async deleteComment(id: number): Promise<boolean> {
    await this.commentRepository.delete(id);
    return true;
  }
}
