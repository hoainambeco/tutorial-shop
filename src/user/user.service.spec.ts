import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const requestMock = {
    user_id: 10000,
    username: 'testhg',
    email: 'nam@gmail.com',
    password: 'test@123',
    role: 'admin',
  };
  const ResponseMock = {
    status: jest.fn((x) => ({
      send: jest.fn((y) => y),
    })),
    send: jest.fn((x) => x),
  } as unknown as Response;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([{}]),
            findOneBy: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('insert', () => {
    it('should return an user', async () => {
      const result = await service.insert(requestMock);
      expect(result).toEqual(requestMock);
    });
  });
  describe('getAll', () => {
    it('should return an user', () => {
      service.findAll().then((result) => {
        expect(result).toEqual([{}]);
      });
    });
  });
  describe('getById', () => {
    it('should return an user', async () => {
      const result = await service.findById(10000);
      expect(result).toBeDefined();
    });
  });
  describe('getByUsername', () => {
    it('should return an user', async () => {
      const resolve = await service.findOne('hoainamadd');
      expect(resolve).toBeDefined();
    });
  });
  describe('update', () => {
    const data = {
      user_id: 10000,
      username: 'namaaa',
      email: 'nam@gmail.com',
      role: 'Admin',
      password: '123456',
    };
    it('should return an user', async () => {
      const result = await service.update(data, 5);
      expect(result).toEqual(data);
    });
  });
  describe('delete', () => {
    it('should return an user', async () => {
      const result = await service.delete(10000);
      expect(result).toBeDefined();
    });
  });
  describe('login', () => {
    it('should return an user', async () => {
      const data = {
        user_id: 10000,
        username: 'hoainamadd',
        password: '0123456',
        email: 'nam@gmail.com',
        role: 'Admin',
      };
      const result = await service.login(data);
      expect(typeof result).toEqual(typeof data);
    });
  });
  describe('updatePassword', () => {
    const data = {
      user_id: 10000,
      username: 'namaaa',
      email: 'nam@gmail.com',
      role: 'Admin',
      password: '123456',
    };
    it('should return an user', async () => {
      const result = await service.updatePassword(5, '0123456', '123456');
      expect(typeof result).toEqual(typeof data);
    });
  });
  describe('deleteUser', () => {
    it('should return an user', async () => {
      const result = await service.deleteUser(5);
      expect(result).not.toBeNull();
    });
  });
});
