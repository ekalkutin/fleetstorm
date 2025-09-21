import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'shared/infrastructure/configuration/configuration.module';

import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigurationModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
