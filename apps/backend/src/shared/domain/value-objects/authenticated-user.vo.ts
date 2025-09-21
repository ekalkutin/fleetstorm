import { GUID } from './guid.vo';

export class AuthenticatedUser {
  constructor(
    public readonly id: GUID,
    public readonly roles: string[],
    public readonly permissions: string[],
  ) {}
}
