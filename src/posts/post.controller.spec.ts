import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsController } from './posts.controller';
import { Post } from './posts.entity';
import { PostsService } from './posts.service';

describe('PostController', () => {
  let controller: PostsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            find: jest.fn().mockResolvedValue([{}]),
            findOneBy: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([{}]),
            findById: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an post', async () => {
      expect(await controller.findAll()).toEqual([{}]);
    });
  });
  describe('getById', () => {
    it('should return an post', async () => {
      const result = await controller.findById(10000);
      expect(result).toBeDefined();
    });
  });
  describe('creatPost', () => {
    it('should return an post', async () => {
      const result = await controller.insert({
        id: 1,
        name: 'test',
        description: 'test',
        count: 20,
        price: 20,
      });
      expect(result).toBeDefined();
    });
  });
  describe('updatePost', () => {
    it('should return an post', async () => {
      const test = {
        user: {
          user_id: 10000,
          username: 'testhg',
          email: 'nam@gmail.com',
          password: 'test@123',
          role: 'Admin',
        },
      };
      const result = await controller.update(
        10000,
        {
          id: 1,
          name: 'test',
          description: 'test',
          count: 20,
          price: 20,
        },
        test,
      );
      expect(result).toBeDefined();
    });
  });
  describe('deletePost', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'testhg',
        email: 'nam@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an post', async () => {
      const result = await controller.delete(10000, test);
      expect(result).toBeDefined();
    });
  });
});
