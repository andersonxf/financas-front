import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    HttpClientModule
  ],
  providers: [
    LancamentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
