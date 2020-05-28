
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams  } from '@angular/common/http';
import * as moment from 'moment';

import { Observable } from 'rxjs/internal/Observable';
import { Lancamento } from '../core/model';
import { FinancaHttp } from '../seguranca/financa-http';
import { environment } from 'src/environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  ItensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

   lancamentosUrl: string;

  constructor(private http: FinancaHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;

   }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  pesquisar(filtro: LancamentoFiltro): Observable <any> {

   //const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
    let params = new HttpParams ();

    params = params.set('page', filtro.pagina.toString());

    params = params.set('size', filtro.ItensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') );

    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));

    }
    //return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
    return this.http.get(`${this.lancamentosUrl}?resumo`, { params });

  }

  excluir(codigo: number): Observable<any> {
    //const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
    //return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers });
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`);
  }

  adicionar(lancamento: Lancamento): Observable<any>{
    const headers = new HttpHeaders({
      //Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.lancamentosUrl}`, JSON.stringify(lancamento), { headers });
   // return this.http.post(`${this.lancamentosUrl}`, JSON.stringify(lancamento));

  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      // Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, 
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    // const headers = new HttpHeaders({
    //   Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    // });

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }



}
