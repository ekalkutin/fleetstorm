import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { IAMModule } from 'features/iam/iam.module';
import { ConfigurationModule } from 'shared/configuration/configuration.module';
import { ConfigurationService } from 'shared/configuration/configuration.service';

import { SignInController } from './api/sign-in.controller';
import { SignInUseCase } from './application/use-cases/sign-in/sign-in.use-case';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => {
        return {
          secret: configService.APP_JWT_SECRET,
        };
      },
    }),
    IAMModule,
  ],
  controllers: [SignInController],
  providers: [SignInUseCase],
})
export class AuthModule {}
