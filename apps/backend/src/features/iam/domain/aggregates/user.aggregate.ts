import { GUID } from 'shared/domain/value-objects/guid.vo';

export class User {
  constructor(
    public readonly id: GUID,
    public readonly username: string,
    public readonly hashedPassword: string,
  ) {}
}
