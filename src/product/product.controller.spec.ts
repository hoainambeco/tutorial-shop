import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

describe('product.controller', () => {
  let productController: ProductController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //   imports: [TypeOrmModule.forFeature([Product])],
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
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
    productController = module.get<ProductController>(ProductController);
  });
  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an product', async () => {
      expect(await productController.findAll()).toEqual([{}]);
    });
  });
  describe('getById', () => {
    it('should return an product', async () => {
      const result = await productController.findById(10000);
      expect(result).toBeDefined();
    });
  });
  describe('creatProduct', () => {
    it('should return an product', async () => {
      const test = {
        user: {
          user_id: 10000,
          username: 'testhg',
          email: 'nam@gmail.com',
          password: 'test@123',
          role: 'Admin',
        },
      };
      const result = await productController.insert(
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
  describe('updateProduct', () => {
    it('should return an product', async () => {
      const test = {
        user: {
          user_id: 10000,
          username: 'testhg',
          email: 'nam@gmail.com',
          password: 'test@123',
          role: 'Admin',
        },
      };
      const result = await productController.update(
        10000,
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
  describe('deleteProduct', () => {
    it('should return an product', async () => {
      const test = {
        user: {
          user_id: 10000,
          username: 'testhg',
          email: 'nam@gmail.com',
          password: 'test@123',
          role: 'Admin',
        },
      };
      const result = await productController.delete(10000, test);
      expect(result).toBeDefined();
    });
  });
});
