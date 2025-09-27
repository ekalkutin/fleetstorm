import { Test } from '@nestjs/testing';

import { AuthModule } from 'features/auth/auth.module';
import { AccountRepositoryPort } from 'features/iam/application/ports/account-repository.port';
import { UserRepositoryPort } from 'features/iam/application/ports/user-repository.port';
import { User } from 'features/iam/domain/aggregates/user.aggregate';
import { AccountBuilder } from 'features/iam/domain/builders/account.builder';
import { IAMModule } from 'features/iam/iam.module';
import { GUID } from 'shared/core/domain/value-objects/guid.vo';
import { HasherPort } from 'shared/core/ports/hasher.port';

import { SignInUseCase } from './sign-in.use-case';

describe('UseCase: Sign-in', () => {
  let useCase: SignInUseCase;

  let userRepository: UserRepositoryPort;
  let accountRepository: AccountRepositoryPort;
  let hasher: HasherPort;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IAMModule, AuthModule],
    }).compile();

    useCase = module.get(SignInUseCase);
    userRepository = module.get(UserRepositoryPort);
    accountRepository = module.get(AccountRepositoryPort);
    hasher = module.get(HasherPort);
  });

  it('should sign-in successfully', async () => {
    // arrange

    const user = await userRepository.save(
      new User(GUID.create(), 'test-username', hasher.hash('test-password')),
    );

    await accountRepository.save(
      new AccountBuilder().withUserId(user.id.value).build(),
    );

    // act

    const authenticatedUser = await useCase.execute(
      'test-username',
      'test-password',
    );

    console.log({ authenticatedUser });

    // assert
    expect(authenticatedUser).not.toBe(null);
  });
});
