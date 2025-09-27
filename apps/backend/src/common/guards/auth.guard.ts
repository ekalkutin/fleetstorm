import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ConfigurationService } from 'shared/configuration/configuration.service';
import {
  AuthenticatedUser,
  AuthenticatedUserPayload,
} from 'shared/value-objects/authenticated-user.vo';
import { GUID } from 'shared/value-objects/guid.vo';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(ConfigurationService)
    private readonly appConfigService: ConfigurationService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const APP_JWT_SECRET = this.appConfigService.APP_JWT_SECRET;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<AuthenticatedUserPayload>(token, {
          secret: APP_JWT_SECRET,
        });

      request['user'] = new AuthenticatedUser(
        GUID.create(payload.id),
        payload.permissions,
      );
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
