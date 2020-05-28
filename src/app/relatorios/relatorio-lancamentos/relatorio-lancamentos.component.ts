import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  dataInicio: Date;
  dataFim: Date;

  constructor(
    private relatorioService: RelatoriosService
  ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatorioService.relatorioLancamentosPorPessoa(
      this.dataInicio, this.dataFim
    )
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    })
    
  }

}
