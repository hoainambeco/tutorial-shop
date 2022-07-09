import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductType } from './entity/productType.entity';
import { ProductTypeService } from './product-type.service';

describe('product type service', () => {
  let service: ProductTypeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    service = module.get<ProductTypeService>(ProductTypeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an product type', async () => {
      expect(await service.findAll()).toEqual([{}]);
    });
  });
  describe('getById', () => {
    it('should return an product type', async () => {
      const result = await service.findById(10000);
      expect(result).toBeDefined();
    });
  });
  describe('creatProductType', () => {
    it('should return an product type', async () => {
      const result = await service.creatProductType({
        id: '1',
        name: 'test',
        description: 'test',
      });
      expect(result).toBeDefined();
    });
  });
  describe('updateProductType', () => {
    it('should return an product type', async () => {
      const result = await service.updateProductType(10000, {
        id: '1',
        name: 'test',
        description: 'test',
      });
      expect(result).toBeDefined();
    });
  });
  describe('deleteProductType', () => {
    it('should return an product type', async () => {
      const result = await service.deleteProductType(10000);
      expect(result).toBeDefined();
    });
  });
});
