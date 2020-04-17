import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ADAL_OPTIONS } from './adal.service';
import { TestComponent } from './test/test.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth.interceptor';
import { RoleDirective } from './role.directive';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {
    path: 'test', component: TestComponent, canActivate: [RoleGuard], data: { role: 'editor' }
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RoleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: ADAL_OPTIONS,
      useValue: environment.adal
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
