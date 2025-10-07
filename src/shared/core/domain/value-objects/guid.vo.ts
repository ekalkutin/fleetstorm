import { randomUUID } from 'node:crypto';

export class GUID {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value?: string): GUID {
    if (value) {
      return new GUID(value);
    }
    return new GUID(randomUUID());
  }
}
