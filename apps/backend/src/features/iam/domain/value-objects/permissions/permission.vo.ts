import { PermissionCode } from 'common/constants/permissions';

export class Permission {
  constructor(
    public readonly code: PermissionCode,
    public readonly description: string,
  ) {}

  public static create(props: {
    code: PermissionCode;
    description?: string;
  }): Permission {
    const code = props.code;
    const description =
      props.description || 'Permission description is not set';

    return new Permission(code, description);
  }
}
