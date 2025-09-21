import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { UserIdentityPort } from 'features/iam/application/ports/user-identity.port';
import { AuthenticatedUser } from 'shared/domain/value-objects/authenticated-user.vo';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(UserIdentityPort) private readonly userIdentity: UserIdentityPort,
  ) {}

  public async execute(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.userIdentity.findByEmail(email);
    void password;

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
