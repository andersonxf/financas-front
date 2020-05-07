import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Pessoa } from '../core/model';
import { FinancaHttp } from '../seguranca/financa-http';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  pessoasUrl: string;//'http://localhost:8080/pessoas';

  constructor(private http: FinancaHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
   }

  pesquisar(filtro: PessoaFiltro): Observable <any> {

    //const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
    let params = new HttpParams ();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?resumo`, { params });
  }

  listarTodas(): Observable<any> {
    //const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});

    return this.http.get(this.pessoasUrl);
  }

  excluir(codigo: number): Observable<any> {
   // const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
    return this.http.delete(`${this.pessoasUrl}/${codigo}`);
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<any> {
    // const headers = new HttpHeaders({
    //   Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
    //   'Content-Type': 'application/json'
    // });

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo);

  }

  adicionar(pessoa: Pessoa): Observable<any> {
    // const headers = new HttpHeaders({
    //   Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
    //   'Content-Type': 'application/json'
    // });

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders({
      // Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
        JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response as Pessoa);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new HttpHeaders({
      // Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => response as Pessoa);
  }

}
