import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { PrismaService } from '../prisma/prisma.service';
import { Item } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('ItemsServiceTest', () => {
  let itemsService: ItemsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ItemsService, PrismaService], // ItemsServiceをインスタンス化
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const items: Item[] = [
        {
          id: 'test-id1',
          name: 'name1',
          price: 1000,
          description: 'description1',
          status: 'ON_SALE',
          userId: 'test-user-id1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'test-id2',
          name: 'name2',
          price: 2000,
          description: 'description2',
          status: 'SOLD_OUT',
          userId: 'test-user-id2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prismaService.item, 'findMany').mockResolvedValue(items);

      const result = await itemsService.findAll();

      expect(result).toEqual(items);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const item: Item = {
        id: 'test-id',
        name: 'name1',
        price: 1000,
        description: 'description1',
        status: 'ON_SALE',
        userId: 'test-user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.item, 'findUnique').mockResolvedValue(item);

      const result = await itemsService.findById(item.id);

      expect(result).toEqual(item);
    });

    it('異常系: データが存在しない', async () => {
      jest.spyOn(prismaService.item, 'findUnique').mockResolvedValue(null);

      await expect(itemsService.findById('test-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
