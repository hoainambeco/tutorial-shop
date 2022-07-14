import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
    private jwrService: JwtService,
  ) {}
  async googleLoginRedirect(req) {
    const { user } = req;
    console.log(user);

    const data: any = JSON.parse(
      JSON.stringify(await this.jwrService.decode(user)),
    );
    const userEntity = await this.userRepository.findOne({
      where: { username: data.id },
    });

    if (!userEntity) {
      const newUser = new User();
      newUser.username = data.id;
      newUser.email = data.email;
      newUser.password = data.id;
      newUser.role = 'google';
      await this.userRepository.save(newUser);
      return newUser;
    } else return data;
  }
}
