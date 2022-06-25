import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType('ProductType')
export class ProductType {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  @Field((type) => ID)
  id: number;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  @Field()
  name: string;

  @Column({
    nullable: true,
    default: '',
  })
  @Field()
  description: string;
}
