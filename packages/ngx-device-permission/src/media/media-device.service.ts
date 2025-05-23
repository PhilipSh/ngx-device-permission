import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';

/**
 * A service for accessing media devices such as microphone and camera
 * using the MediaDevices API in a reactive (RxJS) way.
 */
@Injectable({
  providedIn: 'root',
})
export class MediaDeviceService {
  /**
   * Requests access to media devices (camera and/or microphone).
   * @param constraints MediaStreamConstraints (e.g., { audio: true, video: true })
   * @returns Observable that emits the MediaStream or error.
   */
  requestAccess(constraints: MediaStreamConstraints): Observable<MediaStream> {
    if (!this.isSupported()) {
      return throwError(
        () =>
          new Error('MediaDevices API is not supported in this environment.')
      );
    }

    return from(navigator.mediaDevices.getUserMedia(constraints));
  }

  /**
   * Retrieves a list of all connected media input and output devices.
   * @returns Observable that emits the array of MediaDeviceInfo.
   */
  enumerateDevices(): Observable<MediaDeviceInfo[]> {
    if (!this.isSupported()) {
      return of([]);
    }

    return from(navigator.mediaDevices.enumerateDevices());
  }

  /**
   * Checks whether the MediaDevices API is available.
   */
  private isSupported(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      !!navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    );
  }
}
