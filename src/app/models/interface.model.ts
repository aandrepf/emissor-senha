export class InterfaceEmissor {
  InterfaceEmissorPagina: Pagina[];
  retcode: number;
  retmsg: string;
}
export class Pagina {
  BtnVoltar: boolean;
  Descr: string;
  IconePrioritario: boolean;
  Id: number;
  InterfaceEmissorBotao: Botao[];
  InterfaceEmissorLink: Link[];
  InterfaceEmissorTituloPagina: TituloPagina[];
  MsgExtra: string;
}
export class TituloPagina {
  Id: number;
  IdEmissorPagina: number;
  Negrito: boolean;
  PosicaoTexto: number;
  TamanhoFonte: number;
  TextoPagina: string;
}
export class Botao {
  DescLocalAtendimento: string;
  HasImage: boolean;
  IconePrioritario: boolean;
  Id: number;
  IdBotao: number;
  IdEmissorPagina: number;
  IdLocalAtendimento: number;
  NomeImage: string;
  TamanhoBotao: number;
  TextoBotao: string;
  TipoBotao: number;
}
export class Link {
  Descr: string;
  IconePrioritario: boolean;
  Id: number;
  IdEmissorPagina: number;
  IdEmissorPaginasDestino: number;
  InterfaceEmissorTituloLink: TituloLink[];
  TamanhoBotaolink: number;
  TipoBotao: number;
}
export class TituloLink {
  Id: number;
  IdEmissorPagina: number;
  IdLink: number;
  Negrito: boolean;
  PosicaoTexto: number;
  TamanhoFonte: number;
  TextoLink: string;
}
