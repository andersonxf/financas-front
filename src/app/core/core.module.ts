import { RouterModule } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTopoComponent } from './menu-topo/menu-topo.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    MenuTopoComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    ErrorHandlerService
  ],
  exports: [
    MenuTopoComponent
  ]
})
export class CoreModule { }
