import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostService', () => {
  let service: PostsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: 'PostRepository',
          useValue: {
            find: jest.fn().mockResolvedValue([{}]),
            findOneBy: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();
    service = module.get<PostsService>(PostsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an post', async () => {
      expect(await service.findAll()).toEqual([{}]);
    });
  });
  describe('getById', () => {
    it('should return an post', async () => {
      const result = await service.findById(10000);
      expect(result).toBeDefined();
    });
  });
  describe('creatPost', () => {
    it('should return an post', async () => {
      const result = await service.creatPost({
        id: 1,
        title: 'test',
        content: 'test',
        idProduct: 1,
        idProductType: 1,
        idUser: 1,
        createAt: new Date(),
        updateAt: new Date(),
      });
      expect(result).toBeDefined();
    });
  });

  describe('updatePost', () => {
    it('should return an post', async () => {
      const result = await service.updatePost(10, {
        id: 1,
        title: 'test',
        content: 'test',
        idProduct: 1,
        idProductType: 1,
        idUser: 1,
        createAt: new Date(),
        updateAt: new Date(),
      });
      expect(result).toBeDefined();
    });
  });
  describe('deletePost', () => {
    it('should return an post', async () => {
      const result = await service.deletePost(10000);
      expect(result).toBeDefined();
    });
  });
});
