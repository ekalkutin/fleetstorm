import { AuthenticatedUser } from 'shared/domain/value-objects/authenticated-user.vo';

export abstract class IdentityProviderPort {
  abstract findByUsername(username: string): Promise<AuthenticatedUser | null>;
}
