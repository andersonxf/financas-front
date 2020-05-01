
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {



  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Observable <any> {

    const headers = new HttpHeaders({'Authorization' : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
    let params = new HttpParams ();


    if(filtro.descricao) {
      params = params.set('descricao', filtro.descricao);

    }
    if(filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', filtro.dataVencimentoInicio);

    }

    if(filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', filtro.dataVencimentoFim);

    }
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
  }

}
