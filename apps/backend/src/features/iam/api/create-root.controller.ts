import { Controller, Get, Inject } from '@nestjs/common';

import { CreateRootUserUseCase } from '../application/use-cases/create-root/create-root.use-case';

@Controller('/iam/bootstrap')
export class CreateRootController {
  constructor(
    @Inject(CreateRootUserUseCase)
    private readonly useCase: CreateRootUserUseCase,
  ) {}

  @Get('/')
  async createRoot() {
    await this.useCase.execute();
  }
}
