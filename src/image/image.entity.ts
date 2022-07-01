import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Image')
export class Image {
  @Field((type) => ID)
  id: string;
  @Field()
  url: string;
  @Field()
  idPost: number;
}
