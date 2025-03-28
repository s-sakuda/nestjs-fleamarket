import { Item } from './items.model';
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
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    const item = this.itemsService.findById(id);
    if (!item) {
      throw new NotFoundException('対象のアイテムが見つかりません');
    }

    return item;
  }

  @Post()
  create(@Body() createItemDto: CrateItemDto): Item {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
    const item = this.itemsService.updateStatus(id);
    if (!item) {
      throw new NotFoundException('対象のアイテムが見つかりません');
    }

    return item;
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.itemsService.delete(id);
  }
}
