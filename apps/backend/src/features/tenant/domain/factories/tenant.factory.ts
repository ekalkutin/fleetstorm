import { GUID } from 'common/domain/value-objects/guid.vo';

import { Tenant } from '../aggregates/tenant';
import { SubscriptionPlan } from '../value-objects/subscription-plan.vo';
import { TenantName } from '../value-objects/tenant-name.vo';

type Props = {
  readonly guid?: string;
  readonly name?: string;
};

export class TenantFactory {
  static create(props?: Props): Tenant {
    return new Tenant(
      GUID.create(props?.guid),
      TenantName.create(),
      SubscriptionPlan.create(),
    );
  }
}
