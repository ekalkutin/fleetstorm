import { Test } from '@nestjs/testing';

import { IAMModule } from 'features/iam/iam.module';
import { ConfigurationService } from 'shared/infrastructure/configuration/configuration.service';

import { UserRepositoryPort } from '../../ports/user-repository.port';

import { CreateRootUserUseCase } from './create-root.use-case';

describe('UseCase: Create root user', () => {
  let useCase: CreateRootUserUseCase;
  let userRepo: UserRepositoryPort;
  let configService: ConfigurationService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IAMModule],
    }).compile();

    useCase = module.get(CreateRootUserUseCase);
    userRepo = module.get(UserRepositoryPort);
    configService = module.get(ConfigurationService);
  });

  it('should create root user without tenant', async () => {
    // arrange
    const { username } = configService.ROOT_USER;

    // act

    await useCase.execute();
    const user = await userRepo.findByUsername(username);

    // assert
    expect(user).toBeDefined();
    expect(user!.username).toBe('root@test-env.com');
  });
});
