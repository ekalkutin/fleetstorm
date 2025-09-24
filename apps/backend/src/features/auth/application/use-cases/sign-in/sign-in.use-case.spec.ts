import { Test } from '@nestjs/testing';

import { AuthModule } from 'features/auth/auth.module';
import { UserRepositoryPort } from 'features/iam/application/ports/user-repository.port';
import { User } from 'features/iam/domain/aggregates/user.aggregate';
import { GUID } from 'shared/domain/value-objects/guid.vo';

import { SignInUseCase } from './sign-in.use-case';

describe('UseCase: Sign-in', () => {
  let useCase: SignInUseCase;

  let userRepository: UserRepositoryPort;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    useCase = module.get(SignInUseCase);
    userRepository = module.get(UserRepositoryPort);
  });

  it('should sign-in successfully', async () => {
    // arrange

    await userRepository.save(
      new User(GUID.create(), 'test-username', 'test-password'),
    );

    // act

    const authenticatedUser = await useCase.execute(
      'test-username',
      'password',
    );

    console.log({ authenticatedUser });

    // assert
    expect(authenticatedUser).not.toBe(null);
  });
});
