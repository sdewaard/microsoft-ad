import { Component, OnInit } from '@angular/core';
import { AdalService } from './adal.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  $user:Observable<string>;
  constructor(private service: AdalService) {

  }

  ngOnInit() {
    this.$user = this.service.getUser().pipe(
      map(account => !!account ? account.name : null)
    )
  }

  login() {
    this.$user = this.service.login().pipe(
      switchMap(() => this.service.getUser().pipe(
        map(account => !!account ? account.name : null)
      )),
      catchError(err => of(err))
    )
  }

  logout() {
    this.$user = this.service.logout().pipe(
      map(() => null)
    )
  }
}
