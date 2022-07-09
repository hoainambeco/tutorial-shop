import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
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
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([{}]),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('insert', () => {
    it('should return an user', async () => {
      await controller.insert(requestMock, ResponseMock);
      expect(ResponseMock.status).toHaveBeenCalledWith(201);
    });
  });
  describe('getAll', () => {
    it('should return an user', async () => {
      await controller.findAll(ResponseMock);
      expect(ResponseMock.status).toHaveBeenCalledWith(200);
    });
  });
  describe('getById', () => {
    it('should return an user', async () => {
      await controller.findById(7, ResponseMock);
      expect(ResponseMock.status).toHaveBeenCalledWith(200);
    });
  });
  describe('update', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'testhg',
        email: 'nam@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an user', async () => {
      await controller.update(requestMock, 7, ResponseMock, test);
      expect(ResponseMock.status).toHaveBeenCalledWith(200);
    });
  });
  describe('delete', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'testhg',
        email: 'nam@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an user', async () => {
      await controller.delete(7, test);
      expect(ResponseMock.status).toHaveBeenCalledWith(200);
    });
  });
});
