import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdalService } from './adal.service';
import { map, filter, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private service:AdalService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.service.getToken().pipe(
        map(res => !!res ? res['customClaims'].roles.includes(next.data.role) : false),
        catchError(err => of(false)),
        map(check =>{
          if(!check){
            this.router.navigateByUrl('/')
          }
          return check
        })
      )
  };

}
