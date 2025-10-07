import { Inject, Injectable } from '@nestjs/common';

import { TenantRepositoryPort } from 'features/tenant/application/ports/tenant-repository.port';
import { Tenant } from 'features/tenant/domain/aggregates/tenant.aggregate';
import { TenantProfile } from 'features/tenant/domain/entities/tenant-profile.entity';
import { GUID } from 'shared/core/domain/value-objects/guid.vo';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

import { TenantProfileMapper } from './tenant-profile.mapper';
import { TenantMapper } from './tenant.mapper';

@Injectable()
export class TenantRepositoryAdapter implements TenantRepositoryPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async save(tenant: Tenant, tx?: PrismaService): Promise<Tenant> {
    const client = tx ?? this.prisma;

    await client.tenantProfile.upsert({
      where: {
        id: tenant.profile.id.value,
      },
      create: TenantProfileMapper.toModel(tenant.profile),
      update: TenantProfileMapper.toModel(tenant.profile),
    });

    const result = await client.tenant.upsert({
      where: {
        id: tenant.id.value,
      },
      create: TenantMapper.toModel(tenant),
      update: TenantMapper.toModel(tenant),
    });

    return new Tenant(GUID.create(result.id), TenantProfile.create());
  }
}
