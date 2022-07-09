import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OdersController } from './oders.controller';
import { Oders } from './oders.entity';
import { OdersService } from './oders.service';

describe('OderController', () => {
  let controller: OdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdersController],
      providers: [
        OdersService,
        {
          provide: getRepositoryToken(Oders),
          useValue: {
            find: jest.fn().mockResolvedValue([{}]),
            findOneBy: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            findById: jest.fn().mockResolvedValue({}),
            findByUser: jest.fn().mockResolvedValue([{}]),
          },
        },
      ],
    }).compile();

    controller = module.get<OdersController>(OdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an post', async () => {
      expect(await controller.findByUser('asdas')).toEqual([{}]);
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
      const result = await controller.create(
        {
          id: 1,
          nameProduct: 'test',
          price: 20,
          count: 20,
          user: 'asdas',
        },
        'nam',
      );
      expect(result).toBeDefined();
    });
  });
  //   describe('updatePost', () => {
  //     it('should return an post', async () => {
  //       const result = await controller.update({
  //         id: 1,
  //         name: 'test',
  //         description: 'test',
  //         count: 20,
  //         price: 20,
  //       });
  //       expect(result).toBeDefined();
  //     });
  //   });
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
