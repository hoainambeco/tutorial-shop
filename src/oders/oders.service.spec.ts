import { Test, TestingModule } from '@nestjs/testing';
import { OdersService } from './oders.service';
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

describe('oderService', () => {
  let service: OdersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OdersService,
        {
          provide: 'OderRepository',
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
    service = module.get<OdersService>(OdersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an oder', async () => {
      expect(await service.findByUser('nama')).toEqual([]);
    });
  });
  describe('getOne', () => {
    it('should return an oder', async () => {
      expect(await service.findById('aaac', 'nam')).toEqual([{}]);
    });
  });
  describe('create', () => {
    it('should return an oder', async () => {
      expect(
        await service.createOders(
          {
            id: uuidv4(),
            count: 1,
            nameProduct: 'nameProduct',
            price: 1,
          },
          'hoai',
          uuidv4(),
        ),
      ).toBeDefined();
    });
  });
  describe('update', () => {
    it('should return an oder', async () => {
      expect(
        await service.updateOders(
          '-N5sZxxl1UvuS5GWBihz',
          {
            id: uuidv4(),
            count: 1,
            nameProduct: 'nameProduct',
            price: 1,
          },
          'nam',
          'aaa',
        ),
      ).toBeDefined();
    });
  });
  describe('delete', () => {
    it('should return an oder', async () => {
      expect(
        await service.deleteOders('aaa', 'nam', '-N5sZxxl1UvuS5GWBihz'),
      ).toBeDefined();
    });
  });
});
