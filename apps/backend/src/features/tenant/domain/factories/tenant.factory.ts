import { GUID } from 'common/domain/value-objects/guid.vo';

import { Tenant } from '../aggregates/tenant';
import { TenantProfile } from '../entities/tenant-profile.entity';

export class TenantFactory {
  static create(): Tenant {
    const tenantGuid = GUID.create();

    return new Tenant(tenantGuid, new TenantProfile(GUID.create(), tenantGuid));
  }
}
