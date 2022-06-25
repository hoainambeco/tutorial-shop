import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType('Post')
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field()
  idProduct: number;

  @Column()
  @Field()
  idProductType: number;

  @Column()
  @Field()
  idUser: number;
}
