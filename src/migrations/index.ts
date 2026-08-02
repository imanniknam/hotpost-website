import * as migration_20260801_115408_initial from './20260801_115408_initial';
import * as migration_20260802_173409_add_customer_portal_url from './20260802_173409_add_customer_portal_url';
import * as migration_20260802_232343_add_service_photo from './20260802_232343_add_service_photo';

export const migrations = [
  {
    up: migration_20260801_115408_initial.up,
    down: migration_20260801_115408_initial.down,
    name: '20260801_115408_initial',
  },
  {
    up: migration_20260802_173409_add_customer_portal_url.up,
    down: migration_20260802_173409_add_customer_portal_url.down,
    name: '20260802_173409_add_customer_portal_url',
  },
  {
    up: migration_20260802_232343_add_service_photo.up,
    down: migration_20260802_232343_add_service_photo.down,
    name: '20260802_232343_add_service_photo'
  },
];
