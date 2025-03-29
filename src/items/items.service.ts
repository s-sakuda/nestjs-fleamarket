import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client';
import { CrateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('対象のアイテムが見つかりません');
    }

    return item;
  }

  async create(crateItemDto: CrateItemDto, userId: string): Promise<Item> {
    const { name, price, description } = crateItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
        userId,
      },
    });
  }

  async updateStatus(id: string): Promise<Item> {
    return await this.prismaService.item.update({
      data: {
        status: ItemStatus.SOLD_OUT,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string, userId: string): Promise<Item> {
    return await this.prismaService.item.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
