import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalHttpInterceptorService implements HttpInterceptor {
  static errorCounter = 0;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    return handler.handle(request).pipe(
      catchError((error) => {
        GlobalHttpInterceptorService.errorCounter++;
        return throwError(error);
      })
    );
  }
}
