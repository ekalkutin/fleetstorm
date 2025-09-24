import { GUID } from 'shared/domain/value-objects/guid.vo';

import { Account } from '../aggregates/account.aggregate';

export class AccountBuilder {
  private id!: GUID;
  private tenantId!: GUID;
  private userId!: GUID;
  private roleIds: GUID[];

  constructor() {
    this.id = GUID.create();
    this.roleIds = [];
  }

  public withId(id: string): this {
    this.id = GUID.create(id);
    return this;
  }

  public withTenantId(tenantId: string | null): this {
    if (tenantId) {
      this.tenantId = GUID.create(tenantId);
    }

    return this;
  }

  public withRole(roleId: string): this {
    this.roleIds.push(GUID.create(roleId));
    return this;
  }

  public build(): Account {
    return new Account(this.id, this.tenantId, this.userId, this.roleIds);
  }
}
