export class Permission {
  constructor(
    public readonly code: string,
    public readonly description: string,
  ) {}

  public static create(props: {
    code: string;
    description?: string;
  }): Permission {
    const code = props.code;
    const description =
      props.description || 'Permission description is not set';

    return new Permission(code, description);
  }
}
