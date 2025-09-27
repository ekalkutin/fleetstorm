import { PermissionCode } from 'common/constants/permissions';
import { GUID } from 'shared/core/domain/value-objects/guid.vo';

export abstract class IdentityProviderPort {
  abstract findByUsername(username: string): Promise<{
    readonly id: GUID;
    readonly hashedPassword: string;
    readonly permissions: PermissionCode[];
  } | null>;
}
