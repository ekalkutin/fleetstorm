export const Permissions = {
  IAM: {
    Root: 'IAM:ROOT',
    Account: {
      READ: 'IAM:ACCOUNT:READ',
      UPDATE: 'IAM:ACCOUNT:UPDATE',
    },
  },
} as const;

export type PermissionCode = PermissionValues<typeof Permissions>;

type PermissionValues<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? PermissionValues<T[keyof T]>
    : never;
