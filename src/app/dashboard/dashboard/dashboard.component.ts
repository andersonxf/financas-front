import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  options = {
    tooltips : {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index]
          const label = dataset.label ? (dataset.label + ': ') : '';
          return label + this.decimaPipe.transform(valor, '1.2-2')
        }
      }
    }

  };

  constructor(
    private dashBoardService: DashboardService, 
    private decimaPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashBoardService.lancamentosPorCategoria()
    .then(dados =>{      
      this.pieChartData = {
        labels: dados.map(dado => dado.categoria.nome),
        datasets: [
          {
            data: dados.map(dado => dado.total),
            backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
          }
        ]
      };

    })
  }

  configurarGraficoLinha() {
    this.dashBoardService.lancamentosPorDia()    
    .then(dados => {   
      
      console.log(dados);
      const diasMes = this.configurarDiaMes();
      const totaisReceitas = this.totaisPorCadaDiaMes(
        dados.filter(dado => dado.tipo === 'RECEITA'), diasMes);

      const totaisDespesas = this.totaisPorCadaDiaMes(
        dados.filter( dado => dado.tipo === 'DESPESA'), diasMes);
        
      
      this.lineChartData = {
        labels: diasMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC'
          }, {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00'
          }
        ]
      };

    })
  }

  private totaisPorCadaDiaMes(dados, diasMes) {
    const totais: number[] = [];    

    for (const dia of diasMes) {
      let total = 0;

      for (const dado of dados) {
        if(dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiaMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);

    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];
    var i = 0;
    for( i = 1; i <= quantidade; i ++) {
      dias.push(i);
    }

    return dias;

  }

}
