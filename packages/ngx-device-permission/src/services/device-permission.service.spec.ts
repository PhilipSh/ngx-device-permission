import { TestBed } from '@angular/core/testing';

import { DevicePermissionService } from './device-permission.service';

describe('DevicePermissionService', () => {
  let service: DevicePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
