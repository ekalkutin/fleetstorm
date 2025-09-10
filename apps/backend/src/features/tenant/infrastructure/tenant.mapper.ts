import { Tenant as TenantModel } from '@prisma/client';

import { Tenant } from '../domain/aggregates/tenant';
import { TenantFactory } from '../domain/factories/tenant.factory';

export class TenantPersistenceMapper {
  public toPersistence(aggregate: Tenant): TenantModel {
    return {
      id: aggregate.guid.value,
    };
  }

  public toDomain(): Tenant {
    return TenantFactory.create();
  }
}
