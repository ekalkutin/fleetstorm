import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { ConfigurationService } from 'shared/configuration/configuration.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(ConfigurationService)
    private readonly configurationService: ConfigurationService,
  ) {
    super({
      datasources: {
        db: {
          url: configurationService.DB_CONNECTION,
        },
      },
    });
  }

  public async onModuleInit() {
    await this.$connect();
  }
}
