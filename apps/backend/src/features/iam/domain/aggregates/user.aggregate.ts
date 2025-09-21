import { Email } from 'shared/domain/value-objects/email.vo';
import { GUID } from 'shared/domain/value-objects/guid.vo';

export class User {
  constructor(
    public readonly id: GUID,
    public readonly tenantId: GUID | null,
    public readonly roleIds: GUID[],
    public readonly email: Email,
  ) {}
}
