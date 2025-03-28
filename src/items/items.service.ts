import { Injectable } from '@nestjs/common';
import { Item } from './items.model';
import { CrateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item | null {
    return this.items.find((item) => item.id === id) ?? null;
  }

  create(crateItemDto: CrateItemDto): Item {
    const item: Item = {
      ...crateItemDto,
      id: uuid(),
      status: 'NO_SALE',
    };

    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item | null {
    const item = this.findById(id);
    if (!item) {
      return null;
    }

    item.status = 'SOLD_OUT';
    return item;
  }

  delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
