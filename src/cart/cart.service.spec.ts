import { Test } from '@nestjs/testing';
import { CartService } from './cart.service';
import * as admin from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
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
describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
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

    service = module.get<CartService>(CartService);
  }),
    it('should be defined', () => {
      expect(service).toBeDefined();
    }),
    describe('findAll', () => {
      it('should return an array of carts', async () => {
        const result = await service.findAll();
        expect(result).toBeDefined();
      });
    });
  describe('findOneById', () => {
    it('should return an cart', async () => {
      const result = await service.findById('-N5rLl_zrqQ_ov8gPycY', 'hoai');
      expect(result).toBeDefined();
    });
  });
  describe('findByUser', () => {
    it('should return an array of carts', async () => {
      const result = await service.findByUser('hoai');
      expect(result).toBeDefined();
    });
  });
  describe('create', () => {
    it('should return an cart', async () => {
      const result = await service.createCart(
        {
          id: uuidv4(),
          nameProduct: 'test',
          price: 100,
          count: 1,
        },
        'hoai',
      );
      expect(result).toBeDefined();
    });
  });
  describe('update', () => {
    it('should return an cart', async () => {
      const result = await service.updateCart('-N6icqTtweB4D0bdp8xE', 'hoai', {
        id: uuidv4(),
        nameProduct: 'test',
        price: 100,
        count: 1,
      });
      expect(result).toBeDefined();
    });
  });
  describe('delete', () => {
    it('should return an cart', async () => {
      const result = await service.deleteCart('-N5rLl_zrqQ_ov8gPycY', 'hoai');
      expect(result).toBeDefined();
    });
  });
});
