import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  descricao: string;
  lancamentos: [];
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.pesquisar();
  }


  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    }
    this.lancamentoService.pesquisar(filtro)
    .subscribe(response => this.lancamentos = response.content);
  }

}
