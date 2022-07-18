import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwrService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.UserService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user) {
    const { username, password } = user;
    const userOne = await this.UserService.findOne(username);
    if (userOne && (await bcrypt.compare(password, userOne.password))) {
      const payload = { username: user.username, sub: user.user_id };
      return {
        access_token: this.jwrService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Username or password is incorrect');
    }
  }
}
