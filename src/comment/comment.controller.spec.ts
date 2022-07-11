import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import * as admin from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
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
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
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

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const comments = await controller.getComments(6);
      expect(comments).toBeDefined();
      expect(comments).toHaveLength(1);
    });
    describe('create', () => {
      it('should return an comment', async () => {
        const comment = await controller.createComment({
          content: 'test',
          idPost: 6,
          idUser: 1,
        });
        expect(comment).toBeDefined();
      });
    });
    describe('update', () => {
      const testComment = {
        content: 'test',
        idPost: 6,
        idUser: 1,
      };
      const testUser = {
        user: {
          user_id: 1,
          name: 'test',
          email: 'test@gmail.com',
          password: 'test',
          role: 'test',
        },
      };
      it('should return an comment', async () => {
        const comment = await controller.updateComment(
          1,
          testComment,
          testUser,
        );
        expect(comment).toBeDefined();
      });
    });
    describe('delete', () => {
      const testUser = {
        user: {
          user_id: 1,
          name: 'test',
          email: 'test@gmail.com',
          password: 'test',
          role: 'Admin',
        },
      };
      it('should return an comment', async () => {
        const comment = await controller.deleteComment(1, testUser);
        expect(comment).toEqual(true);
      });
    });
  });
});
