import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an product', async () => {
      expect(await service.findAll()).toEqual([{}]);
    });
  });
  describe('getById', () => {
    it('should return an product', async () => {
      const result = await service.findById(10000);
      expect(result).toBeDefined();
    });
  });
  describe('creatProduct', () => {
    it('should return an product', async () => {
      const result = await service.creatProduct({
        id: 1,
        name: 'test',
        description: 'test',
        count: 20,
        price: 20,
      });
      expect(result).toBeDefined();
    });
  });
  describe('updateProduct', () => {
    it('should return an product', async () => {
      const result = await service.updateProduct(10000, {
        id: 1,
        name: 'test',
        description: 'test',
        count: 20,
        price: 20,
      });
      expect(result).toBeDefined();
    });
  });
  describe('deleteProduct', () => {
    it('should return an product', async () => {
      const result = await service.deleteProduct(10000);
      expect(result).toBeDefined();
    });
  });
});
