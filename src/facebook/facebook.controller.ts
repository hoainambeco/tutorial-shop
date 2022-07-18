import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FacebookService } from './facebook.service';

@Controller('facebook')
@ApiTags('Facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}
  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    return HttpStatus.OK;
  }
  @Get('/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req) {
    console.log(req);
    return await this.facebookService.login(req.user);
  }
}
