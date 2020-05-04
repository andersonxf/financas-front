
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment/moment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Lancamento } from '../core/model';

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

   lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Observable <any> {

    const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
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
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });

  }

  excluir(codigo: number): Observable<any> {
    const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

  adicionar(lancamento: Lancamento): Observable<any>{
    const headers = new HttpHeaders({
      Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.lancamentosUrl}`, JSON.stringify(lancamento), { headers });

  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
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
    const headers = new HttpHeaders({
      Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
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
