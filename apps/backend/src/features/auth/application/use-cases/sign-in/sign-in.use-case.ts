import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { IdentityProviderPort } from 'features/iam/application/ports/identity-provider.port';
import { AuthenticatedUser } from 'shared/domain/value-objects/authenticated-user.vo';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(IdentityProviderPort)
    private readonly identityProvider: IdentityProviderPort,
  ) {}

  public async execute(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.identityProvider.findByUsername(username);
    void password;

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
