import { GUID } from 'shared/value-objects/guid.vo';
import { Phone } from 'shared/value-objects/phone.vo';

export class TenantProfile {
  constructor(
    public readonly id: GUID,
    public readonly phone: Phone,
  ) {}

  static create(props?: { id?: string; phone?: string }): TenantProfile {
    return new TenantProfile(
      GUID.create(props?.id),
      new Phone(props?.phone || '+7 930 222 44 98'),
    );
  }
}
