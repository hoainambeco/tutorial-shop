import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  idPost: number;

  @Column({
    nullable: false,
    default: 0,
  })
  @Field()
  idUser: number;
}
