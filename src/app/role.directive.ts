import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdalService } from './adal.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[AuthRole]'
})
export class RoleDirective implements OnInit, OnDestroy {
  @Input() role: string;
  _subscription: Subscription;
  constructor(private service: AdalService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this._subscription = this.service.getToken().pipe(
      map(res => res['customClaims'].roles.includes(this.role)),
    ).subscribe(check => {
      if (check) {
        this.viewContainer.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainer.clear()
      }
    })
  }

  ngOnDestroy() {
    this._subscription.unsubscribe()
  }

}
