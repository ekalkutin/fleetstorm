import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentConfig } from './environment.interface';

@Injectable()
export class ConfigurationService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvironmentConfig>,
  ) {
    console.log(`Environment: ${configService.get('NODE_ENV')}`);
  }

  public get ROOT_EMAIL(): string {
    return this.configService.get('ROOT_EMAIL')!;
  }

  public get DB_CONNECTION(): string {
    const DB_HOST = this.configService.get('DB_HOST', { infer: true });
    const DB_PORT = this.configService.get('DB_PORT');
    const DB_NAME = this.configService.get('DB_NAME');

    const DB_USERNAME = this.configService.get('DB_USERNAME');
    const DB_PASSWORD = this.configService.get('DB_PASSWORD');

    return `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public`;
  }
}
