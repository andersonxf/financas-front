import { Injectable } from '@angular/core';
import * as moment from 'moment';


import { environment } from './../../environments/environment'
import { FinancaHttp } from '../seguranca/financa-http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  

  lancamentosUrl: string;

  constructor(private http: FinancaHttp) { 
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;   
  }

  lancamentosPorCategoria(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response);
  }

  lancamentosPorDia(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: any) {
    for (const dado of dados) {
      //dado.dia = moment(dado.dia).format('YYYY-MM-DD');
      
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
