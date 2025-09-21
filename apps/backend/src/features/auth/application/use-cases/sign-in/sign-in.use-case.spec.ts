import { Test } from '@nestjs/testing';

import { AuthModule } from 'features/auth/auth.module';
import { UserRepositoryPort } from 'features/iam/application/ports/user-repository.port';
import { UserBuilder } from 'features/iam/domain/builders/user.builder';

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
      new UserBuilder().withEmail('test-user@test-email.com').build(),
    );

    // act

    const authenticatedUser = await useCase.execute(
      'test-user@test-email.com',
      'password',
    );

    console.log({ authenticatedUser });

    // assert
    expect(authenticatedUser).not.toBe(null);
  });
});
