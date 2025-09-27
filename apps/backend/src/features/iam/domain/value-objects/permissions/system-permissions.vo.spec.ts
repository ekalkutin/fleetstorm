import { Permissions, PermissionCode } from 'common/constants/permissions';

import { SYSTEM_PERMISSIONS } from './system-permissions.vo';

export function collectPermissionCodes(obj: object): PermissionCode[] {
  const result: PermissionCode[] = [];

  for (const value of Object.values(obj)) {
    if (typeof value === 'string') {
      result.push(value as PermissionCode);
    } else if (typeof value === 'object' && value !== null) {
      result.push(...collectPermissionCodes(value));
    }
  }

  return result;
}

describe('SYSTEM_PERMISSIONS', () => {
  it('should contain all defined permission codes', () => {
    const allPermissionCodes = collectPermissionCodes(Permissions);
    const systemCodes = SYSTEM_PERMISSIONS.map(p => p.code);

    // check missing
    const missing = allPermissionCodes.filter(
      code => !systemCodes.includes(code),
    );
    expect(missing).toEqual([]);

    const invalid = systemCodes.filter(
      code => !allPermissionCodes.includes(code),
    );
    expect(invalid).toEqual([]);
  });
});
