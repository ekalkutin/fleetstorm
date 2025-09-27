import { createHmac, timingSafeEqual } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { ConfigurationService } from 'shared/configuration/configuration.service';
import { HasherPort } from 'shared/core/ports/hasher.port';

@Injectable()
export class HasherAdapter implements HasherPort {
  constructor(
    @Inject(ConfigurationService)
    private readonly configurationService: ConfigurationService,
  ) {}

  public hash(value: string): string {
    const hmac = createHmac('sha256', this.configurationService.APP_SALT);
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
