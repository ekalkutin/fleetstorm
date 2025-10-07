import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfigurationModule } from 'shared/configuration/configuration.module';
import { DatabaseModule } from 'shared/infrastructure/persistence/database/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, CqrsModule.forRoot()],
})
export class MainModule {}
