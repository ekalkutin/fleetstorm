import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IdentityProviderPort } from 'features/iam/application/ports/identity-provider.port';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { HasherPort } from 'shared/ports/hasher.port';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(IdentityProviderPort)
    private readonly identityProvider: IdentityProviderPort,

    @Inject(JwtService) private readonly jwtService: JwtService,

    @Inject(HasherPort)
    private readonly hasher: HasherPort,

    @Inject(ConfigurationService)
    private readonly configurationService: ConfigurationService,
  ) {}

  public async execute(
    username: string,
    password: string,
  ): Promise<{
    accessToken: string;
  }> {
    const identity = await this.identityProvider.findByUsername(username);

    if (!identity || !this.hasher.compare(password, identity.hashedPassword)) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign(
      {
        id: identity.id.value,
        permissions: identity.permissions,
      },
      {},
    );

    return {
      accessToken: token,
    };
  }
}
