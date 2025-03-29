import { Item } from '@prisma/client';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CrateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    const item = await this.itemsService.findById(id);
    if (!item) {
      throw new NotFoundException('対象のアイテムが見つかりません');
    }

    return item;
  }

  @Post()
  async create(@Body() createItemDto: CrateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Put(':id')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Item | null> {
    return await this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.itemsService.delete(id);
  }
}
