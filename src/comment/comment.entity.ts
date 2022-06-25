import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/posts.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType('Comment')
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  @Field()
  content: string;

  @Column({
    nullable: false,
    default: 0,
  })
  @Field()
  @ManyToOne((type) => Post, (posts) => posts.id)
  idPost: number;

  @Column({
    nullable: false,
    default: 0,
  })
  @Field()
  @ManyToOne((type) => User, (user) => user.user_id)
  idUser: number;
}
