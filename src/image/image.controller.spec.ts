import { ImageController } from './image.controller';
import * as admin from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { ImageService } from './image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Image } from './image.entity';

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
describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
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
    controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an post', async () => {
      expect(await controller.findAll()).toBeDefined();
    });
  });
  describe('getById', () => {
    it('should return an post', async () => {
      const result = await controller.findById({
        id: '-N5dB-7rXr13Y-hREh2I',
        idPost: 1,
      });
      expect(result).toBeDefined();
    });
  });
  describe('getByPost', () => {
    it('should return an post', async () => {
      expect(await controller.findByPost(10000)).toBeDefined();
    });
  });
  describe('create', () => {
    it('should return an post', async () => {
      expect(
        await controller.createImage({
          id: uuidv4(),
          url: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          idPost: 2,
        }),
      ).toBeDefined();
    });
  });
  describe('update', () => {
    it('should return an post', async () => {
      expect(
        await controller.updateImage(
          { id: '82c970c2-ec57-42e8-b10f-babc8a27d751', idPost: 2 },
          {
            id: uuidv4(),
            url: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            idPost: 2,
          },
        ),
      ).toBeDefined();
    });
  });
  describe('delete', () => {
    it('should return an post', async () => {
      expect(
        await controller.deleteImage({
          id: '82c970c2-ec57-42e8-b10f-babc8a27d751',
          idPost: 2,
        }),
      ).toBeDefined();
    });
  });
});
