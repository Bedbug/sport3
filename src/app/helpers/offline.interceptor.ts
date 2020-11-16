import { Injectable } from "@angular/core";
import { fromEvent, throwError } from "rxjs";
import { delay, mapTo, retryWhen, switchMap } from "rxjs/operators";

@Injectable()
export class OfflineInterceptor {
  private onlineChanges$ = fromEvent(window, 'online').pipe(mapTo(true)).pipe(delay(2000));
  
  get isOnline() {
    return navigator.onLine;
  }

  intercept(req, next) {
    return next.handle(req).pipe(
      retryWhen(errors => {
        if (this.isOnline) {
          return errors.pipe(switchMap(err => throwError(err)));
        }
        return this.onlineChanges$;
         
      })
    );
  }
}