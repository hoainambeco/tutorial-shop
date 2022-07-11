import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as admin from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
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
describe('CommentController', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: {
            find: jest.fn().mockResolvedValue([{}]),
            findOneBy: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            findById: jest.fn().mockResolvedValue({}),
            findByUser: jest.fn().mockResolvedValue([{}]),
            findBy: jest.fn().mockResolvedValue([{}]),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const comments = await service.findAllByPostId(6);
      expect(comments).toBeDefined();
      expect(comments).toHaveLength(1);
    });
  });
  describe('findOneById', () => {
    it('should return a comment', async () => {
      const comment = await service.findById(2);
      expect(comment).toBeDefined();
    });
  });
  describe('create', () => {
    it('should return a comment', async () => {
      const comment = await service.createComment({
        id: 1,
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        idPost: 8,
        idUser: 9,
      });
      expect(comment).toBeDefined();
    });
  });
  describe('update', () => {
    it('should return a comment', async () => {
      const comment = await service.updateComment(5, {
        id: 1,
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        idPost: 8,
        idUser: 9,
      });
      expect(comment).toBeDefined();
    });
  });
  describe('delete', () => {
    it('should return a comment', async () => {
      const comment = await service.deleteComment(85);
      expect(comment).toBeDefined();
    });
  });
});
