import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Represents the permission state returned by the Permissions API.
 */
export type PermissionState = PermissionStatus['state']; // 'granted' | 'denied' | 'prompt'

@Injectable({
  providedIn: 'root',
})
export class DevicePermissionService {
  /**
   * Returns the current state of a given permission.
   * @param name Name of the permission (e.g., 'camera', 'microphone', 'geolocation', etc.)
   */
  getPermissionStatus(name: PermissionName): Observable<PermissionState> {
    if (!this.isSupported()) {
      return of('prompt');
    }

    return from(navigator.permissions.query({ name })).pipe(
      map((status) => status.state)
    );
  }

  /**
   * Observes changes to the state of a given permission.
   * @param name Name of the permission to observe
   */
  observePermissionChange(name: PermissionName): Observable<PermissionState> {
    if (!this.isSupported()) {
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

  /**
   * Checks if the Permissions API is available in the current environment.
   */
  private isSupported(): boolean {
    return typeof window !== 'undefined' && 'permissions' in navigator;
  }
}
