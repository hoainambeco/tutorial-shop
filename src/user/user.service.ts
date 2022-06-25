import { Injectable } from '@nestjs/common';
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
    private readonly user: Repository<User>,
  ) {}
  async creatUser(userDto: UserDto): Promise<User> {
    const { username, email, password } = userDto;
    const user = this.user.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    return this.user.save(user);
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.user.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(username: string): Promise<User> | undefined {
    try {
      return await this.user.findOneBy({ username: username });
    } catch (error) {
      return error;
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.user.findOneBy({ user_id: id });
    } catch (error) {
      console.log(error);
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
      return await this.user.save(user);
    } catch (error) {
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

  async login(user: User): Promise<User> {
    try {
      const userLogin = await this.user.findOneBy({ username: user.username });
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
    }
  }

  async update(oldUser: User, user: User, params: { id: any }): Promise<User> {
    try {
      const updateUser = oldUser;
      Object.keys(user).forEach((key) => {
        updateUser[key] = user[key];
      });
      const password = await bcrypt.hash(user.password, 10);
      updateUser.password = password;
      await this.user.update(params.id, updateUser);
      return await this.user.findOneBy({ user_id: params.id });
    } catch (error) {
      console.log(error);
      message = {
        message: 'ID không tồn tại',
      };
      return message as User | any;
    }
  }

  async delete(id: number): Promise<User> {
    try {
      await this.user.remove(await this.user.findOneBy({ user_id: id }));
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
      const user = await this.user.findOneBy({ user_id: id });
      if (user) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
          const newPassword = await bcrypt.hash(password, 10);
          user.password = newPassword;
          await this.user.update(id, user);
          return user;
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
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await this.user.delete(id);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
