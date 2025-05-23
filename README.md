# NgxDevicePermission

Angular library for handling device permissions (camera, microphone, geolocation, etc.) in a reactive way using RxJS.

## Installation

```bash
npm install ngx-device-permission
```

## Usage

### DevicePermissionService

Service for working with the Permissions API.

```typescript
import { Component, inject } from '@angular/core';
import { DevicePermissionService } from 'ngx-device-permission';

@Component({
  selector: 'app-permissions',
  standalone: true,
  template: `
    <button (click)="checkPermission()">Check Camera Permission</button>
    <button (click)="observePermission()">Observe Microphone Permission</button>
  `,
})
export class PermissionsComponent {
  private devicePermission = inject(DevicePermissionService);

  // Get current permission status
  checkPermission() {
    this.devicePermission.getPermissionStatus('camera').subscribe((status) => {
      console.log('Camera permission status:', status); // 'granted' | 'denied' | 'prompt'
    });
  }

  // Observe permission status changes
  observePermission() {
    this.devicePermission
      .observePermissionChange('microphone')
      .subscribe((status) => {
        console.log('Microphone permission changed:', status);
      });
  }
}
```

### MediaDeviceService

Service for working with media devices (camera, microphone).

```typescript
import { Component, inject } from '@angular/core';
import { MediaDeviceService } from 'ngx-device-permission';

@Component({
  selector: 'app-media',
  standalone: true,
  template: `
    <button (click)="requestMediaAccess()">Request Media Access</button>
    <button (click)="listDevices()">List Devices</button>
  `,
})
export class MediaComponent {
  private mediaDevice = inject(MediaDeviceService);

  // Request access to media devices
  requestMediaAccess() {
    this.mediaDevice.requestAccess({ video: true, audio: true }).subscribe({
      next: (stream) => {
        console.log('Media access granted:', stream);
      },
      error: (error) => {
        console.error('Media access denied:', error);
      },
    });
  }

  // Get list of available media devices
  listDevices() {
    this.mediaDevice.enumerateDevices().subscribe((devices) => {
      console.log('Available devices:', devices);
    });
  }
}
```

## Supported Permissions

The library supports all permissions available through the Permissions API:

- camera
- microphone
- geolocation
- notifications
- push
- midi
- clipboard-read
- clipboard-write
- payment-handler
- background-sync
- persistent-storage
- ambient-light-sensor
- accelerometer
- gyroscope
- magnetometer
- screen-wake-lock

## Requirements

- Angular 19.2.0 or higher
- RxJS 7.8.0 or higher

## License

MIT
