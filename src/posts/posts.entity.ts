import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from 'src/product-type/entity/productType.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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
