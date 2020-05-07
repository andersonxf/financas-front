import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FinancaHttp } from '../seguranca/financa-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;//'http://localhost:8080/categorias';

  constructor(
    private http: FinancaHttp
    ) { 
      this.categoriasUrl = `${environment.apiUrl}/categorias`;
    }

  listarTodas(): Observable<any> {
    //const headers = new HttpHeaders({Authorization : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});
    return this.http.get(this.categoriasUrl);
  }
}
