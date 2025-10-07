import { Role } from 'features/iam/domain/aggregates/role.aggregate';

export abstract class RoleRepositoryPort {
  abstract save(role: Role): Promise<Role>;
  abstract findByCode(code: string): Promise<Role | null>;
}
