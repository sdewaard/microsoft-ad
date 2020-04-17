import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';
import { AdalService } from './adal.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private service: AdalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.service.getToken().pipe(
            map(res => !!res ? res.accessToken : null),
            mergeMap(token => {
                const request = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`)
                });
                return next.handle(request)
            })
        )
    }
}
