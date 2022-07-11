import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as admin from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { Image } from './image.entity';
import { ImageService } from './image.service';
const firebaseConfig = {
  apiKey: 'AIzaSyClVY0tjkN1_CF9NeOftILg_WJ1j1cfo1w',
  authDomain: 'tutorial-store-facdd.firebaseapp.com',
  databaseURL:
    'https://tutorial-store-facdd-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'tutorial-store-facdd',
  storageBucket: 'tutorial-store-facdd.appspot.com',
  messagingSenderId: '933972862496',
  appId: '1:933972862496:web:3e44adfd9bffd12f847e45',
  measurementId: 'G-EN7PMF52Q5',
};
admin.initializeApp(firebaseConfig);
describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: getRepositoryToken(Image),
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
    service = module.get<ImageService>(ImageService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of images', async () => {
      const result = await service.findAll();
      expect(result).toBeDefined();
    });
  });
  describe('findOneById', () => {
    it('should return an image', async () => {
      const result = await service.findById('-N5dAuDYhTE44RlhxAKH', 2);
      expect(result).toBeDefined();
    });
  });
  describe('findByPost', () => {
    it('should return an array of images', async () => {
      const result = await service.findByPost(2);
      expect(result).toBeDefined();
    });
  });
  describe('create', () => {
    it('should return an image', async () => {
      const result = await service.createImage({
        id: uuidv4(),
        url: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        idPost: 2,
      });
      expect(result).toBeDefined();
    });
  });
  describe('update', () => {
    it('should return an image', async () => {
      const result = await service.updateImage(
        uuidv4(),
        {
          id: uuidv4(),
          url: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          idPost: 2,
        },
        2,
      );
      expect(result).toBeDefined();
    });
  });
  describe('delete', () => {
    it('should return an image', async () => {
      const result = await service.deleteImage(uuidv4(), 2);
      expect(result).toEqual(true);
    });
  });
});
