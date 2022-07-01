import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageDto } from './image.dto';
import { ImageService } from './image.service';
import { Image } from './image.entity';

@Resolver((of) => Image)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}
  @Query((returns) => [Image])
  images() {
    return this.imageService.findAll();
  }
  @Query((returns) => Image)
  image(@Args('id') id: string, @Args('idPost') idPost: number) {
    return this.imageService.findById(id, idPost);
  }
  @Query((returns) => [Image])
  imagesByPost(@Args('idPost') idPost: number) {
    return this.imageService.findByPost(idPost);
  }
  @Mutation((returns) => Image)
  createImage(@Args('image') image: ImageDto) {
    return this.imageService.createImage(image);
  }
  @Mutation((returns) => Image)
  updateImage(
    @Args('id') id: string,
    @Args('idPort') idPost: number,
    @Args('image') image: ImageDto,
  ) {
    return this.imageService.updateImage(id, image, idPost);
  }
  @Mutation((returns) => Boolean)
  deleteImage(@Args('id') id: string, @Args('idPort') idPost: number) {
    return this.imageService.deleteImage(id, idPost);
  }
}
