export abstract class Hasher {
  abstract hash(value: string): string;
  abstract compare(value: string, hashedValue: string): boolean;
}
