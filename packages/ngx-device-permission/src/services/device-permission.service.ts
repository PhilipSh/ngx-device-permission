import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { isBrowser } from '../utils/ssr-utils';

@Injectable({
  providedIn: 'root',
})
export class DevicePermissionService {
  getPermissionStatus(name: PermissionName): Observable<PermissionState> {
    if (!isBrowser() || !navigator.permissions) {
      return of('prompt');
    }

    return from(navigator.permissions.query({ name })).pipe(
      map((status) => status.state)
    );
  }

  observePermissionChange(name: PermissionName): Observable<PermissionState> {
    if (!isBrowser() || !navigator.permissions) {
      return of('prompt');
    }

    return new Observable<PermissionState>((observer) => {
      navigator.permissions.query({ name }).then((status) => {
        const emit = () => observer.next(status.state);

        emit();
        status.onchange = emit;
      });
    });
  }

  requestAccess(constraints: MediaStreamConstraints): Observable<MediaStream> {
    if (!isBrowser() || !navigator.mediaDevices?.getUserMedia) {
      return new Observable<MediaStream>((observer) => {
        observer.error(
          new Error('Media access not available in SSR or this browser.')
        );
      });
    }

    return from(navigator.mediaDevices.getUserMedia(constraints));
  }
}
