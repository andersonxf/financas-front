import { Component, OnInit, Input } from '@angular/core';
import { Contato } from 'src/app/core/model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  contato: Contato;
  exibirFormularioContato = false;
  contatoIndex: number;

  constructor(
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.exibirFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibirFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);

    this.exibirFormularioContato = false;

    frm.reset();
  }

  confirmarExclusaoContato(index: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este contato?',
      accept: () => {
        this.contatos.splice(index, 1);
      }
    });
  } 

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo,
      contato.nome, contato.email, contato.telefone);
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }

}
