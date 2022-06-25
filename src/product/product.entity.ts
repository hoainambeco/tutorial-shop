import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from 'src/product-type/entity/productType.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType('Product')
export class Product {
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
    default: 0,
  })
  @Field()
  price: number;

  @Column({
    default: 0,
    nullable: true,
  })
  @Field()
  count: number;

  @Column({
    nullable: true,
    default: '',
  })
  @Field()
  description: string;
}
