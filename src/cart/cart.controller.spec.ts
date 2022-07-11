import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import * as admin from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
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
describe('Controller', () => {
  let controller: CartController;
  let service: CartService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{}]),
            findById: jest.fn().mockResolvedValue({}),
            findByUser: jest.fn().mockResolvedValue([{}]),
            createCart: jest.fn().mockResolvedValue({}),
            updateCart: jest.fn().mockResolvedValue({}),
            deleteCart: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();
    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of carts', async () => {
      const result = await controller.findAll();
      expect(result).toBeDefined();
    });
  });
  describe('findById', () => {
    it('should return an cart', async () => {
      const result = await controller.findById({
        id: '-N5rLl_zrqQ_ov8gPycY',
        user: 'hoai',
      });
      expect(result).toBeDefined();
    });
  });
  describe('findByUser', () => {
    it('should return an array of carts', async () => {
      const result = await controller.findByPost('hoai');
      expect(result).toBeDefined();
    });
  });
  describe('createCart', () => {
    it('should return an cart', async () => {
      const result = await controller.createCart('hoai', {
        id: uuidv4(),
        nameProduct: 'test',
        price: 100,
        count: 1,
      });
      expect(result).toBeDefined();
    });
  });
  describe('updateCart', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'hoai',
        email: 'nam@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an cart', async () => {
      const result = await controller.updateCart(
        { id: '-N6icqTtweB4D0bdp8xE', user: 'hoai' },
        {
          id: uuidv4(),
          nameProduct: 'test',
          price: 100,
          count: 1,
        },
        test,
      );
      expect(result).toBeDefined();
    });
  });
  describe('deleteCart', () => {
    const test = {
      user: {
        user_id: 10000,
        username: 'hoai',
        email: 'nam@gmail.com',
        password: 'test@123',
        role: 'Admin',
      },
    };
    it('should return an cart', async () => {
      const result = await controller.deleteCart('-N5rLl_zrqQ_ov8gPycY', test);
      expect(result).toBeDefined();
    });
  });
});
