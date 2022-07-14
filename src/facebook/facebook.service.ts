import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';

@Injectable()
export class FacebookService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
    private jwrService: JwtService,
  ) {}
  async login(user: any) {
    type User = {
      email: string;
      firstName: string;
      lastName: string;
      facebookId: string;
      facebookToken: string;
    };
    type Data = {
      user: User;
      accessToken: string;
      refreshToken: string;
    };
    const data: Data = JSON.parse(
      JSON.stringify(await this.jwrService.decode(user)),
    );
    console.log(data);
    console.log(Object.keys(data));
    console.log(data.user.facebookId);
    const userEntity = await this.userRepository.findOne({
      where: { username: data.user.facebookId },
    });
    if (!userEntity) {
      const newUser = new User();
      newUser.username = data.user.facebookId;
      newUser.email = data.user.email;
      newUser.password = data.user.facebookId;
      newUser.role = 'facebook';

      await this.userRepository.save(newUser);
      return newUser;
    } else return data;
  }
}
