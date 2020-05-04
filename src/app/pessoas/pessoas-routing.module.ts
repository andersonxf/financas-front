import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';

const routes: Routes = [
  {
    path: 'pessoas',
    component: PessoaPesquisaComponent,
  },
  {
    path: 'pessoas/nova',
    component: PessoaCadastroComponent,
  },
  {
    path: 'pessoas/:codigo',
    component: PessoaCadastroComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }