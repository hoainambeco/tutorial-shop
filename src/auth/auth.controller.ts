import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Login, UserDto } from '../user/dto/user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @UseGuards(LocalStrategy)
  @Post('login')
  async login(@Body() body: Login) {
    return this.AuthService.login(body);
  }
  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  async test(@Body() body, @Request() req) {
    console.log(req.user);
  }
}
