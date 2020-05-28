import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';


@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {
  lancamentos: [];
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  filtro = new LancamentoFiltro();

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService
    ) { }

  ngOnInit(): void {
   // this.pesquisar();
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
    .subscribe(response => {
      this.lancamentos = response.content;
      this.totalRegistros = response.totalElements;
    },
    error => {
      this.errorHandler.handle(error);
    }
    );
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o item',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .subscribe(() => {
      if ( this.grid.first === 0 ) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Lançamento Excluido com sucesso!'});
      
    })
    ;
  }
}
