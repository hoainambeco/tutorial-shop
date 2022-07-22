import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ImageDto } from './image.dto';
import { ImageService } from './image.service';

@Controller('image')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Get('all-images')
  async findAll(): Promise<ImageDto[]> {
    return (await this.imageService.findAll()) as ImageDto[];
  }

  @Get('byidimage/:id/:idPost')
  @ApiParam({ name: 'id', description: 'id of image' })
  @ApiParam({ name: 'idPost', description: 'id of post' })
  async findById(@Param() param): Promise<ImageDto> {
    return (await this.imageService.findById(
      param.id,
      param.idPost,
    )) as ImageDto;
  }

  @Get('postid/:id')
  @ApiParam({ name: 'id' })
  async findByPost(@Param() param): Promise<ImageDto[]> {
    console.log(param.id);
    return (await this.imageService.findByPost(param.id)) as ImageDto[];
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createImage(@Body() image: ImageDto): Promise<ImageDto> {
    return await this.imageService.createImage(image);
  }

  @Put('/:id/:idPost')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'idPost' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateImage(
    @Param() param,
    @Body() image: ImageDto,
  ): Promise<ImageDto> {
    return await this.imageService.updateImage(param.id, image, param.idPost);
  }

  @Delete('/:id/:idPost')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'idPost' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteImage(@Param() param) {
    return await this.imageService.deleteImage(param.id, param.idPost);
  }
  @Delete('deletebypost/:idPost')
  @ApiParam({ name: 'idPost' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteByPost(@Param() param) {
    return await this.imageService.deleteByPost(param.idPost);
  }
}
