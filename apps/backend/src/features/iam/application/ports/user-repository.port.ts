import { User } from 'features/iam/domain/aggregates/user.aggregate';

export abstract class UserRepositoryPort {
  abstract save(user: User): Promise<User>;
  abstract findByUsername(username: string): Promise<User | null>;
}
