import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { AuthService } from '../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FinancaHttp } from '../seguranca/financa-http';
import { MenuTopoComponent } from './menu-topo/menu-topo.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { CategoriaService } from '../categorias/categoria.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';
import {ToastModule} from 'primeng/toast';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    MenuTopoComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ConfirmDialogModule,  

  ],
  providers: [
    LancamentoService,
    PessoasService,
    CategoriaService,
    ErrorHandlerService,
    ConfirmationService,
    MessageService,    
    AuthService,
    JwtHelperService,
    FinancaHttp,
    DashboardService,
    RelatoriosService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
    
  ],
  exports: [
    MenuTopoComponent,    
    ConfirmDialogModule,
    ToastModule
  ]
})
export class CoreModule { }
