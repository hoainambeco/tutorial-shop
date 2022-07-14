import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsModule } from './posts/posts.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';
import { CartModule } from './cart/cart.module';
import { OdersModule } from './oders/oders.module';
import { FacebookModule } from './facebook/facebook.module';
import { GoogleModule } from './google/google.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tutorial_shop',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PostsModule,
    ProductTypeModule,
    ProductModule,
    CommentModule,
    ImageModule,
    CartModule,
    OdersModule,
    GoogleModule,
    FacebookModule,
  ],
  providers: [],
})
export class AppModule {}
