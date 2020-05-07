import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PessoasService } from './pessoas/pessoas.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { AppRoutingModule } from './app-routing.module';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AuthService } from './seguranca/auth.service';
import { FinancaHttp } from './seguranca/financa-http';
registerLocaleData(ptBr);




@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ConfirmDialogModule,
    CoreModule,
    ToastrModule.forRoot(),    
    SegurancaModule,
    AppRoutingModule,
  ],
  providers: [
    ConfirmationService,
    ToastrService,
    LancamentoService,
    PessoasService,
    AuthService,
    JwtHelperService,
    FinancaHttp,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
