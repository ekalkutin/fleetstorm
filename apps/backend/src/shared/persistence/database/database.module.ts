import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'shared/configuration/configuration.module';

import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigurationModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
