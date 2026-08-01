import * as migration_20260801_115408_initial from './20260801_115408_initial';

export const migrations = [
  {
    up: migration_20260801_115408_initial.up,
    down: migration_20260801_115408_initial.down,
    name: '20260801_115408_initial'
  },
];
