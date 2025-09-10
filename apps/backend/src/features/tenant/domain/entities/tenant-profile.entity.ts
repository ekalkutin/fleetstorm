import { GUID } from 'common/domain/value-objects/guid.vo';

export class TenantProfile {
  constructor(
    public readonly guid: GUID,
    public readonly tenantId: GUID,
  ) {}
}
