import { Body, Controller, Inject, Post } from '@nestjs/common';

import { SignInUseCase } from '../application/use-cases/sign-in/sign-in.use-case';

import { SignInDto } from './dto/sign-in.dto';

@Controller('/auth/sign-in')
export class SignInController {
  constructor(
    @Inject(SignInUseCase) private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('/')
  async signIn(@Body() dto: SignInDto) {
    return this.signInUseCase.execute(dto.username, dto.password);
  }
}
