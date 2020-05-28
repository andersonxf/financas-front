import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa, Contato } from 'src/app/core/model';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params.codigo;
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

    this.carregarEstados();
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
    .then(cidades => {
      this.cidades = cidades.map(c => (
        {label: c.nome, value: c.codigo })
      )
      
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
    .then(estados => {
      this.estados = estados.map(uf => (
        {label: uf.nome, value: uf.codigo })
      )
      
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.estadoSelecionado = (this.pessoa.endereco.cidade) ? 
        this.pessoa.endereco.cidade.estado.codigo : null;

        if(this.estadoSelecionado) {
          this.carregarCidades();
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form) {
    this.pessoaService.adicionar(this.pessoa)
    .toPromise()
    .then(() => {
      this.messageService.add({severity:'success', summary:'Mensagem', detail:'Pessoa adicionada com sucesso!'});
      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.messageService.add({severity:'success', summary:'Mensagem', detail:'Pessoa alterada com sucesso!'});
        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  
}
