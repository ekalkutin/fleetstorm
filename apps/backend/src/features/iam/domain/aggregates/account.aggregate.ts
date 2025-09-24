import { GUID } from 'shared/domain/value-objects/guid.vo';

export class Account {
  constructor(
    public readonly id: GUID,
    public readonly tenantId: GUID,
    public readonly userId: GUID,
    public readonly roleIds: GUID[],
  ) {}
}
