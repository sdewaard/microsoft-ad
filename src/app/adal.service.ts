import { Injectable, InjectionToken, Inject } from '@angular/core';
import * as Msal from 'msal';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const ADAL_OPTIONS = new InjectionToken<string>('ADAL_OPTIONS');

@Injectable({
  providedIn: 'root'
})
export class AdalService {

  public msal: Msal.UserAgentApplication;

  constructor(@Inject(ADAL_OPTIONS) options?: Msal.Configuration) {
    this.msal = new Msal.UserAgentApplication(options);
  }

  public login(): Observable<Msal.AuthResponse> {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };
    return from(this.msal.loginPopup(loginRequest))
  }

  public logout():Observable<void> {
    return of(this.msal.logout());
  }

  public getUser(): Observable<Msal.Account> {
    return of(this.msal.getAccount())
  }

  public getToken(): Observable<Msal.AuthResponse> {
    const requestObj = {
      scopes: ["user.read"]
    };
    return from(this.msal.acquireTokenSilent(requestObj)).pipe(
      map(res => ({...res, customClaims:{roles:['editor','reader']}})), //tmp adding userClaims
    )
  }

}

