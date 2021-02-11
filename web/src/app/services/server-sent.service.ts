import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerSentService {

  constructor(private _zone: NgZone) {
  }

  public getEventSource<T>(url: string): Observable<T> {
    return new Observable(observer => {
      const eventSource = new EventSource(url);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event.data);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }
}
