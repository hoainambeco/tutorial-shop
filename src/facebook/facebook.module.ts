import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';
import { FacebookStrategy } from './facebook.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey',
      //thời gian hết hạn token
      // signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  providers: [FacebookService, FacebookStrategy, UserService],
  controllers: [FacebookController],
})
export class FacebookModule {}
