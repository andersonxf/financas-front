import { ToastrService } from 'ngx-toastr';
import { LancamentoService } from './../lancamento.service';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/core/model';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias = [];
  pessoas = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  lancamento = new Lancamento();


  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoasService: PessoasService,
    private lancamentoService: LancamentoService,
    private toasty: ToastrService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params.codigo;

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCaterogiras();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .toPromise()
    .then(lancamentoAdicionado => {
      this.toasty.success('Lançamento adicionado com sucesso!');
      // form.reset();
      // this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);

    })
    .catch(error => this.errorHandler.handle(error));
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.toasty.success('Lançamento atualizado com sucesso');
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

  novo(form: NgForm) {
    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1 );
    this.router.navigate(['lancamentos/novo']);
  }

}
