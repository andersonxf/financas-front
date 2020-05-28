import { LancamentoService } from './../lancamento.service';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/core/model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  formulario: FormGroup;
  uploadEmAndamento = false;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ]; 


  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoasService,
    private lancamentoService: LancamentoService,    
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder   
    ) { }

  ngOnInit(): void {

    this.configurarFormulario();

    const codigoLancamento = this.route.snapshot.params.codigo;

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCaterogiras();
    this.carregarPessoas();
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {    
    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: "http:"+anexo.url
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar anexo!' });

    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();      
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
    .toPromise()
    .then(lancamentoAdicionado => {      
      this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Lançamento adicionado com sucesso!'});
      // form.reset();
      // this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);

    })
    .catch(error => this.errorHandler.handle(error));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
    .then(lancamento => {
      this.formulario.patchValue(lancamento);
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Lançamento atualizado com sucesso'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCaterogiras() {
    return this.categoriaService.listarTodas()
    .subscribe( categorias => {
      this.categorias = categorias.map(c => {
        return {label: c.nome, value: c.codigo};
      });
    },
    error => {
      this.errorHandler.handle(error);
    }
    );
  }

  carregarPessoas() {
    return this.pessoasService.listarTodas()
    .subscribe( pessoas => {
      console.log(pessoas);
      this.pessoas = pessoas.content.map(p => {
        return {label: p.nome, value: p.codigo};
      });
    },
    error => {
      this.errorHandler.handle(error);
    }
    );
  }

  novo() {
    this.formulario.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1 );
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

}
