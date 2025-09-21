import { AuthenticatedUser } from 'shared/domain/value-objects/authenticated-user.vo';

export abstract class UserIdentityPort {
  abstract findByEmail(email: string): Promise<AuthenticatedUser | null>;
}
