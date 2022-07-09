import { Injectable, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
let message: { message: string };
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { DataSnapshot, getDatabase, push, ref, set } from 'firebase/database';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}
  async creatUser(userDto: UserDto) {
    const { username, email, password, role } = userDto;
    const user = this.userRepository.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ username: username });
    } catch (error) {
      return error;
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ user_id: id });
    } catch (error) {
      return error;
    }
  }

  async insert(user: User): Promise<User> {
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
    try {
      //thêm dữ liệu vào firebase
      // const db = getDatabase();
      // const reference = ref(db, 'users/');
      // push(reference, user); //tự tạo id
      //https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields
      //thêm dữ liệu vào cơ sở dữ liệu
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      if (error.code == 'ER_DUP_ENTRY') {
        message = {
          message: 'Tên đăng nhập đã tồn tại',
        };
        return message as User | any;
      } else {
        return error;
      }
    }
  }

  async login(user: User) {
    try {
      const userLogin = await this.userRepository.findOneBy({
        username: user.username,
      });
      if (userLogin) {
        const isMatch = await bcrypt.compare(user.password, userLogin.password);
        if (isMatch) {
          return userLogin;
        } else {
          message = {
            message: 'Mật khẩu không đúng',
          };
          return message as User | any;
        }
      } else {
        message = {
          message: 'Tên đăng nhập không tồn tại',
        };
        return message as User | any;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(updateUser: User, id: number) {
    try {
      const { username, email, role } = updateUser;
      await this.userRepository.save({ user_id: id, username, email, role });
      return updateUser;
    } catch (error) {
      return error;
    }
  }

  async delete(id: number): Promise<User> {
    try {
      await this.userRepository.remove(
        await this.userRepository.findOneBy({ user_id: id }),
      );
      message = {
        message: 'Xóa thành công',
      };
      return message as User | any;
    } catch (error) {
      message = {
        message: 'ID không tồn tại',
      };
      return message as User | any;
    }
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    password: string,
  ): Promise<UserDto> {
    try {
      let user = await this.userRepository.findOneBy({ user_id: id });
      if (user) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
          const newPassword = await bcrypt.hash(password, 10);
          user.password = newPassword;
          await this.userRepository.update(id, { password: newPassword });
          return await this.userRepository.findOneBy({ user_id: id });
        } else {
          message = {
            message: 'Mật khẩu không đúng',
          };
          return message as UserDto | any;
        }
      } else {
        message = {
          message: 'ID không tồn tại',
        };
        return message as UserDto | any;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
