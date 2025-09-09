import { randomUUID } from 'node:crypto';

export class GUID {
  private readonly _guid: string;

  private constructor(value: string) {
    this._guid = value;
  }

  public static create(value?: string): GUID {
    if (value) {
      return new GUID(value);
    }
    return new GUID(randomUUID());
  }

  public get value(): string {
    return this._guid;
  }
}
