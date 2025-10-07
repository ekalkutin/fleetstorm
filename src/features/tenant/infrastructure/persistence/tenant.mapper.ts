import { Tenant as TenantModel } from '@prisma/client';

import { Tenant } from 'features/tenant/domain/aggregates/tenant.aggregate';

export class TenantMapper {
  public static toModel(tenant: Tenant): TenantModel {
    return {
      id: tenant.id.value,
      profileId: tenant.profile.id.value,
    };
  }
}
