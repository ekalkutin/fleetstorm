export abstract class HasherPort {
  abstract hash(value: string): string;
  abstract compare(value: string, hashedValue: string): boolean;
}
