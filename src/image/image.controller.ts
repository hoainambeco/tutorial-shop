import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ImageDto } from './image.dto';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Get()
  async findAll(): Promise<any> {
    return await this.imageService.findAll();
  }

  @Get('/:id/:idPost')
  async findById(@Param() param) {
    return await this.imageService.findById(param.id, param.idPost);
  }

  @Get('postid/:id')
  async findByPost(@Param() param) {
    return await this.imageService.findByPost(param.id);
  }

  @Post()
  async createImage(@Body() image: ImageDto): Promise<ImageDto> {
    return await this.imageService.createImage(image);
  }

  @Put('/:id/:idPost')
  async updateImage(
    @Param() param,
    @Body() image: ImageDto,
  ): Promise<ImageDto> {
    return await this.imageService.updateImage(param.id, image, param.idPost);
  }

  @Delete('/:id/:idPost')
  async deleteImage(@Param() param) {
    return await this.imageService.deleteImage(param.id, param.idPost);
  }
}
