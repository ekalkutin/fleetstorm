import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from 'common/infrastructure/persistence/database/prisma.service';

import { Tenant } from '../domain/aggregates/tenant';
import { TenantRepository } from '../domain/repositories/tenant.repository';

import { TenantPersistenceMapper } from './tenant.mapper';

@Injectable()
export class TenantRepositoryImpl implements TenantRepository {
  private readonly mapper = new TenantPersistenceMapper();

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async save(tenant: Tenant): Promise<void> {
    await this.prisma.tenant.upsert({
      where: {
        id: tenant.guid.value,
      },
      create: this.mapper.toPersistence(tenant),
      update: this.mapper.toPersistence(tenant),
    });
  }
}
