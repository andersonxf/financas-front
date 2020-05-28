import { Injectable } from '@angular/core';
import { FinancaHttp } from '../seguranca/financa-http';
import * as moment from 'moment';

import { environment } from './../../environments/environment'
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: FinancaHttp) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
   }

   relatorioLancamentosPorPessoa(dataInicio: Date, dataFim: Date) {
    const params = new HttpParams()
      .append('dataInicio', moment(dataInicio).format('YYYY-MM-DD'))
      .append('dataFim', moment(dataFim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorio/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }
}
