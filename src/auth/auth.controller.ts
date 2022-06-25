import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @UseGuards(LocalStrategy)
  @Post('login')
  async login(@Request() req) {
    return this.AuthService.login(req.body);
  }
  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  async test(@Body() body, @Request() req) {
    console.log(req.user);
  }
}
