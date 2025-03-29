import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 外部のモジュールからPrismaServiceを利用できるようにする
})
export class PrismaModule {}
