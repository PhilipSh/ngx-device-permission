# ngx-device-permission

Angular library for managing browser permissions and accessing media devices (like microphone and camera) in a reactive and composable way using the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API).

## 📦 Installation

```bash
npm install ngx-device-permission
```

## 🚀 Features

- ✅ Check browser permission status (camera, microphone, geolocation, etc.)
- ✅ Observe permission changes via RxJS
- ✅ Request access to camera and microphone
- ✅ List connected media input/output devices
- 🔧 SSR-safe
- 📦 Tree-shakable and modular

## 📚 Usage

### 1. DevicePermissionService

Wrapper around the native navigator.permissions API.

```typescript
import { Component, inject } from '@angular/core';
import { DevicePermissionService } from 'ngx-device-permission';

@Component({
  selector: 'app-permissions',
  standalone: true,
  template: `
    <div>
      <h3>Camera Permission</h3>
      <p>Status: {{ cameraStatus$ | async }}</p>
    </div>

    <div>
      <h3>Microphone Permission</h3>
      <p>Status: {{ microphoneStatus$ | async }}</p>
    </div>

    <div>
      <h3>Media Access</h3>
      <button (click)="requestMediaAccess()">
        Request Camera & Microphone
      </button>
    </div>
  `,
})
export class PermissionsComponent {
  private permissionService = inject(DevicePermissionService);
  private mediaService = inject(MediaDeviceService);

  cameraStatus$ = this.permissionService.observePermissionChange('camera');
  microphoneStatus$ =
    this.permissionService.observePermissionChange('microphone');
  devices$ = this.mediaService.enumerateDevices();
  stream: MediaStream | null = null;

  requestMediaAccess() {
    this.mediaService
      .requestAccess({ video: true, audio: true })
      .subscribe((stream) => {
        this.stream = stream;
      });
  }
}
```

## 🗺 Roadmap

| Feature                                                  | Status     |
| -------------------------------------------------------- | ---------- |
| Permission status query (Permissions API)                | ✅ Done    |
| Reactive permission change observer                      | ✅ Done    |
| Media stream request (camera, mic)                       | ✅ Done    |
| Device enumeration (microphones, cameras)                | ✅ Done    |
| Clipboard permission + interaction (navigator.clipboard) | ✅ Done    |
| Geolocation permission and observer                      | ✅ Done    |
| Notification permission API                              | ⏳ Planned |

## 🤝 Contributing

PRs are welcome! Feel free to open issues or request new features.
