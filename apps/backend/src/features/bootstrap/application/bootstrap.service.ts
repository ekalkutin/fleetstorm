import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { CreateRootUserUseCase } from 'features/iam/application/use-cases/create-root/create-root.use-case';

@Injectable()
export class BootstrapService implements OnModuleInit {
  constructor(
    @Inject(CreateRootUserUseCase)
    private readonly createRootUseCase: CreateRootUserUseCase,
  ) {}

  public async onModuleInit() {
    this.execute();
  }

  public async execute(): Promise<void> {
    await this.createRootUseCase.execute();
  }
}
