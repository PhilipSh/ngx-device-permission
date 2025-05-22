# ngx-device-permission

Angular library for convenient handling of device permissions (camera, microphone, geolocation, etc.).

## Installation

```bash
npm install ngx-device-permission
```

## Usage

### Using the Service

```typescript
import { Component, inject } from '@angular/core';
import { DevicePermissionService } from 'ngx-device-permission';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-camera',
  template: `
    <button (click)="requestCameraPermission()">Enable Camera</button>
    <video #videoElement *ngIf="hasCameraPermission"></video>
  `,
})
export class CameraComponent {
  private devicePermission = inject(DevicePermissionService);
  hasCameraPermission = false;

  requestCameraPermission() {
    this.devicePermission
      .requestAccess({ video: true })
      .pipe(
        tap(() => {
          this.hasCameraPermission = true;
          // Initialize camera
        })
      )
      .subscribe({
        error: (error) => console.error('Error requesting permission:', error),
      });
  }
}
```

## Supported Permissions

The library supports all standard browser permissions through the Permissions API:

- `camera` - access to camera
- `microphone` - access to microphone
- `geolocation` - access to geolocation
- `notifications` - access to notifications
- `clipboard` - access to clipboard
- `midi` - access to MIDI devices
- `payment-handler` - access to payment handlers
- `persistent-storage` - access to persistent storage
- `push` - access to push notifications

## API

### DevicePermissionService

#### Methods

- `getPermissionStatus(name: PermissionName): Observable<PermissionState>`

  - Gets the current status of a permission
  - Returns an Observable that emits the current permission state
  - Automatically handles SSR environment

- `observePermissionChange(name: PermissionName): Observable<PermissionState>`

  - Observes changes in permission status
  - Returns an Observable that emits whenever the permission state changes
  - Automatically handles SSR environment

- `requestAccess(constraints: MediaStreamConstraints): Observable<MediaStream>`
  - Requests access to media devices (camera, microphone)
  - Returns an Observable that emits the MediaStream when access is granted
  - Automatically handles SSR environment

#### Types

```typescript
type PermissionState = 'granted' | 'denied' | 'prompt';
```

## Usage Examples

### Observing Permission Changes

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { DevicePermissionService } from 'ngx-device-permission';

@Component({
  selector: 'app-permissions',
  template: `
    <div>Camera permission: {{ cameraPermission$ | async }}</div>
    <div>Microphone permission: {{ microphonePermission$ | async }}</div>
  `,
})
export class PermissionsComponent implements OnInit {
  private devicePermission = inject(DevicePermissionService);

  cameraPermission$ = this.devicePermission.observePermissionChange('camera');
  microphonePermission$ =
    this.devicePermission.observePermissionChange('microphone');
}
```

### Requesting Multiple Permissions

```typescript
import { Component, inject } from '@angular/core';
import { DevicePermissionService } from 'ngx-device-permission';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-multi-permissions',
  template: `
    <button (click)="requestPermissions()">Request Permissions</button>
  `,
})
export class MultiPermissionsComponent {
  private devicePermission = inject(DevicePermissionService);

  requestPermissions() {
    forkJoin({
      camera: this.devicePermission.requestAccess({ video: true }),
      microphone: this.devicePermission.requestAccess({ audio: true }),
    }).subscribe({
      next: (streams) => {
        // Handle successful access to both devices
        console.log('Access granted to all devices');
      },
      error: (error) => {
        console.error('Error requesting permissions:', error);
      },
    });
  }
}
```

## Requirements

- Angular >= 19.2.0
- Modern browser support
- RxJS (included with Angular)

## License

MIT

## Author

Philip Shpen

## Support

If you encounter any issues or have suggestions for improvements, please create an issue in the [GitHub repository](https://github.com/PhilipSh/ngx-device-permission/issues).
