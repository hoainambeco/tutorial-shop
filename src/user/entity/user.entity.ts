import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType('User')
export class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  @Field((type) => ID)
  user_id: number;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  @Field()
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  @Field()
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  @Field()
  password: string;

  @Column({
    nullable: false,
    default: 'User',
  })
  @Field()
  role: string;
}
