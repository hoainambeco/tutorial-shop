import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';

@Controller('google')
@ApiTags('Google')
export class GoogleController {
  constructor(private readonly service: GoogleService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req) {
    console.log(req);
    return await this.service.googleLoginRedirect(req);
  }
}
