import { User } from 'features/iam/domain/aggregates/user.aggregate';

export abstract class UserRepositoryPort {
  abstract save(user: User, tx?: unknown): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
