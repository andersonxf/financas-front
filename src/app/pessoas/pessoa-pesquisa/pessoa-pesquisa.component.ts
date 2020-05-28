import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoasService } from '../pessoas.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';


@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
    private pessoaService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .subscribe(response => {
      this.pessoas = response.content;
      this.totalRegistros = response.totalElements;
    });
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .subscribe(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({severity:'success', summary:'Mensagem', detail:'Pesssoa excluída com sucesso!'});
        
      },
      error => {
        this.errorHandler.handle(error);

      });

  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.messageService.add({severity:'success', summary:'Mensagem', detail:`Pessoa ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
