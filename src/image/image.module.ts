import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageResolver } from './image.resolver';

@Module({
  providers: [ImageService, ImageResolver],
  controllers: [ImageController],
})
export class ImageModule {}
