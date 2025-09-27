import { createHmac, timingSafeEqual } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { ConfigurationService } from 'shared/configuration/configuration.service';

@Injectable()
export class HashingService {
  private readonly salt: string;

  constructor(
    @Inject(ConfigurationService)
    private readonly configurationService: ConfigurationService,
  ) {
    this.salt = configurationService.APP_JWT_SECRET;
  }

  public hash(value: string): string {
    const hmac = createHmac('sha256', this.salt);
    hmac.update(value);

    return hmac.digest('hex');
  }

  public compare(value: string, hashed: string): boolean {
    const hashedValue = this.hash(value);
    const bufferA = Buffer.from(hashedValue, 'hex');
    const bufferB = Buffer.from(hashed, 'hex');

    if (bufferA.length !== bufferB.length) return false;

    return timingSafeEqual(bufferA, bufferB);
  }
}
