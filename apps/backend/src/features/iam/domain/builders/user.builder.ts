import { Email } from 'shared/domain/value-objects/email.vo';
import { GUID } from 'shared/domain/value-objects/guid.vo';

import { User } from '../aggregates/user.aggregate';

export class UserBuilder {
  private id!: GUID;
  private tenantId: GUID | null;
  private roleIds: GUID[];

  private email!: Email;

  constructor() {
    this.id = GUID.create();
    this.tenantId = null;
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

  public withEmail(email: string): this {
    this.email = Email.create(email);
    return this;
  }

  public withRole(roleId: GUID): this {
    this.roleIds.push(roleId);
    return this;
  }

  public build(): User {
    return new User(this.id, this.tenantId, this.roleIds, this.email);
  }
}
