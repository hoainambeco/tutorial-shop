import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductType } from './entity/productType.entity';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';

describe('ProductTypeController', () => {
  let productTypeController: ProductTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTypeController],
      providers: [
        ProductTypeService,
        {
          provide: getRepositoryToken(ProductType),
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
    productTypeController = module.get<ProductTypeController>(
      ProductTypeController,
    );
  });

  it('should be defined', () => {
    expect(productTypeController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an product type', async () => {
      expect(await productTypeController.findAll()).toEqual([{}]);
    });
  });

  describe('getById', () => {
    it('should return an product type', async () => {
      const result = await productTypeController.findById(10000);
      expect(result).toBeDefined();
    });
  });
  describe('creatProductType', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'testhg',
        email: 'nam@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an product type', async () => {
      const result = await productTypeController.insert(
        {
          id: '1',
          name: 'test',
          description: 'test',
        },
        test,
      );
      expect(result).toBeDefined();
    });
  });
  describe('updateProductType', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'testhg',
        email: 'asbab@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an product type', async () => {
      const result = await productTypeController.update(
        {
          id: '1',
          name: 'test',
          description: 'test',
        },
        1,
        test,
      );
      expect(result).toBeDefined();
    });
  });
  describe('deleteProductType', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'testhg',
        email: 'asbab@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an product type', async () => {
      const result = await productTypeController.delete(1, test);
      expect(result).toBeDefined();
    });
  });
});
