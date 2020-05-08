import { RouterModule } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTopoComponent } from './menu-topo/menu-topo.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { AuthService } from '../seguranca/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FinancaHttp } from '../seguranca/financa-http';
import { CategoriaService } from '../categorias/categoria.service';

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
    ToastrModule.forRoot(),    
  ],
  providers: [
    LancamentoService,
    PessoasService,
    CategoriaService,
    ErrorHandlerService,
    ConfirmationService,
    ToastrService,
    AuthService,
    JwtHelperService,
    FinancaHttp,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  exports: [
    MenuTopoComponent,
    ToastrModule,
    ConfirmDialogModule
  ]
})
export class CoreModule { }
