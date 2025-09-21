import { Module } from '@nestjs/common';

import { IAMModule } from 'features/iam/iam.module';

import { SignInUseCase } from './application/use-cases/sign-in/sign-in.use-case';

@Module({
  imports: [IAMModule],
  providers: [SignInUseCase],
})
export class AuthModule {}
