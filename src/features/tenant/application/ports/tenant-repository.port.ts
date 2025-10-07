import { Tenant } from 'features/tenant/domain/aggregates/tenant.aggregate';

export abstract class TenantRepositoryPort {
  abstract save(tenant: Tenant, tx?: unknown): Promise<Tenant>;
}
