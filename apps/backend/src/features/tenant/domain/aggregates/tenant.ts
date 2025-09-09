import { AggregateRoot } from '@nestjs/cqrs';

import { GUID } from 'common/domain/value-objects/guid.vo';

import { SubscriptionPlan } from '../value-objects/subscription-plan.vo';
import { TenantName } from '../value-objects/tenant-name.vo';

export class Tenant extends AggregateRoot {
  public constructor(
    private readonly _guid: GUID,
    private readonly _name: TenantName,
    private readonly _subscriptionPlan: SubscriptionPlan,
  ) {
    super();
  }

  public get guid(): GUID {
    return this._guid;
  }
}
