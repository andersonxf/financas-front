export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(
    codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string    
  ) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}

export class Estado {
  codigo: number;
  nome: string;  
}

export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
  contatos = new Array<Contato>();
}

export class Categoria {
  codigo: number;
}

export class Lancamento {
  codigo: number;
  descricao: string;
  tipo = 'RECEITA';
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  anexo: string;
  urlAnexo: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
