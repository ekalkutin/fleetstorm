import { GUID } from 'shared/core/domain/value-objects/guid.vo';

import { TenantProfile } from '../entities/tenant-profile.entity';

export class Tenant {
  constructor(
    public readonly id: GUID,
    public readonly profile: TenantProfile,
  ) {}
}
