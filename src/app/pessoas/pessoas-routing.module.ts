import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: PessoaPesquisaComponent,
  },
  {
    path: 'nova',
    component: PessoaCadastroComponent,
  },
  {
    path: ':codigo',
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
