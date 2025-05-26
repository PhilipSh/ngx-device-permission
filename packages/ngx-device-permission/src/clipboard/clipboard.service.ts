import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  /**
   * Try to request access to clipboard-read permission
   * by invoking navigator.clipboard.readText()
   */
  requestClipboardReadAccess(): Observable<string> {
    return new Observable((observer) => {
      if (!navigator.clipboard?.readText) {
        observer.error(
          new Error('Clipboard API not supported in this browser.')
        );
        return;
      }

      navigator.clipboard
        .readText()
        .then((text) => {
          observer.next(text);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  /**
   * Try to write text to clipboard to trigger clipboard-write permission
   */
  requestClipboardWriteAccess(text: string): Observable<void> {
    return new Observable((observer) => {
      if (!navigator.clipboard?.writeText) {
        observer.error(
          new Error('Clipboard API not supported in this browser.')
        );
        return;
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
