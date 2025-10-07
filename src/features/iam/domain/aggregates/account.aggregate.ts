import { GUID } from 'shared/core/domain/value-objects/guid.vo';

export class Account {
  constructor(
    public readonly id: GUID,
    public readonly tenantId: GUID | null,
    public readonly userId: GUID,
    public readonly roleIds: GUID[],
  ) {}
}
