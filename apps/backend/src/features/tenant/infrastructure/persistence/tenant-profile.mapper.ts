import { TenantProfile as TenantProfileModel } from '@prisma/client';

import { TenantProfile } from 'features/tenant/domain/entities/tenant-profile.entity';

export class TenantProfileMapper {
  public static toModel(tenantProfile: TenantProfile): TenantProfileModel {
    return {
      id: tenantProfile.id.value,
      phone: tenantProfile.phone.value,
    };
  }
}
