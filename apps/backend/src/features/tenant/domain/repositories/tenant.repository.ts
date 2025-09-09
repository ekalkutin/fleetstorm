import { Tenant } from '../aggregates/tenant';

export abstract class TenantRepository {
  abstract save(tenant: Tenant): Promise<void>;
}
