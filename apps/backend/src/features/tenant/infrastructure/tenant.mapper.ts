import { Tenant as TenantModel } from '@prisma/client';

import { Tenant } from '../domain/aggregates/tenant';
import { TenantFactory } from '../domain/factories/tenant.factory';

export class TenantPersistenceMapper {
  public toPersistence(aggregate: Tenant): TenantModel {
    return {
      id: aggregate.guid.value,
    };
  }

  public toDomain(model: TenantModel): Tenant {
    return TenantFactory.create({
      guid: model.id,
    });
  }
}
