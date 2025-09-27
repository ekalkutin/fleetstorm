import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IdentityProviderPort } from 'features/iam/application/ports/identity-provider.port';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(IdentityProviderPort)
    private readonly identityProvider: IdentityProviderPort,

    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  public async execute(
    username: string,
    password: string,
  ): Promise<{
    accessToken: string;
  }> {
    const user = await this.identityProvider.findByUsername(username);
    void password;

    if (!user) throw new UnauthorizedException();

    const token = this.jwtService.sign(user.toJSON(), {});

    return {
      accessToken: token,
    };
  }
}
