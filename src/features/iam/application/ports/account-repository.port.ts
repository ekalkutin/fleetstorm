import { Account } from 'features/iam/domain/aggregates/account.aggregate';

export abstract class AccountRepositoryPort {
  abstract save(account: Account, tx?: unknown): Promise<Account>;
  abstract findByUsername(email: string): Promise<Account | null>;
  abstract findAll(): Promise<Account[]>;
}
