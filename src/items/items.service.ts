import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client';
import { CrateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item | null> {
    return await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });
  }

  async create(crateItemDto: CrateItemDto): Promise<Item> {
    const { name, price, description } = crateItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
      },
    });
  }

  async updateStatus(id: string): Promise<Item | null> {
    return await this.prismaService.item.update({
      data: {
        status: ItemStatus.SOLD_OUT,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return await this.prismaService.item.delete({
      where: {
        id,
      },
    });
  }
}
