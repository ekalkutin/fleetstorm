import { AggregateRoot } from '@nestjs/cqrs';

import { GUID } from 'common/domain/value-objects/guid.vo';

import { TenantProfile } from '../entities/tenant-profile.entity';

export class Tenant extends AggregateRoot {
  public constructor(
    private readonly _guid: GUID,
    private readonly _profile: TenantProfile,
  ) {
    super();
  }

  public get guid(): GUID {
    return this._guid;
  }
}
