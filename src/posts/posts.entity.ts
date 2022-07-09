import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from '../product-type/entity/productType.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/entity/user.entity';
import {
  Column,
  Entity,
  EntityRepository,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

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
  @ManyToOne((type) => Product, (product) => product.id)
  idProduct: number;

  @Column()
  @Field()
  @ManyToOne((type) => ProductType, (productType) => productType.id)
  idProductType: number;

  @Column()
  @Field()
  @OneToOne((type) => User, (user) => user.user_id)
  idUser: number;

  @Column()
  @Field()
  createAt: Date;

  @Column()
  @Field()
  updateAt: Date;
}
