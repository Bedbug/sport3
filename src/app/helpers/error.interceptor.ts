import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service'
import { TranslateService } from '@ngx-translate/core';

const errorCodes = {
    10002: { 'en': "The card has already closed." }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private toastr: ToastrService, private translate: TranslateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want

                    if (event.body.errorCode) {
                        console.log(errorCodes[event.body.errorCode][this.translate.currentLang]);
                        this.toastr.show(errorCodes[event.body.errorCode][this.translate.currentLang],event.body.errorCode);
                    }
                }
            }, (err => {
                console.log(err);
                if ([401, 403].indexOf(err.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                }

                const error = err.statusText; //err.error.message ||
                return throwError(error);
            })));
    }


}