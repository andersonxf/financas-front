import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { environment } from 'src/environments/environment';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    LoginComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],providers: [
    AuthGuard,
    LogoutService
  ],
})
export class SegurancaModule { }
