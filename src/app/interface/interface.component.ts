import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

import { InterfaceService } from './../services/interface.services';
import { Pagina, TituloPagina, Link, Botao } from './../models/interface.model';
import { Global } from '../app.globals';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subTimer: Subscription;

  public regexNegrito = /([*])(.+)/g;

  public pagina: Pagina;
  public contentPagina: any[];
  public tituloPagina: TituloPagina[];
  public links: Link[];
  public botoes: Botao[];
  public titlePaddingTop;
  public msgExtra;
  public previousButton;
  public pageNav;
  public timeIdle;

  private list = [1];

  constructor(
    private _interface: InterfaceService,
    private _active: ActivatedRoute,
    private _route: Router,
    ) {}

  @HostListener('window:click') windowClick(): void {
    console.log('CLICOU NA TELA!');
    clearTimeout(this.timeIdle);
  }

  ngOnInit() {
    // verifica a cada 10 segundos se o JSON da interface atualizou
    this.subTimer = timer(0, 10 * 1000).subscribe((t: any) => {
      this.verificaInterface();
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) { this.sub.unsubscribe(); }
    if (this.subTimer !== undefined) { this.subTimer.unsubscribe(); }
  }

  public verificaInterface() {
    if (sessionStorage.length !== 0) {
      this._interface.getInterfaceContent().subscribe(
      data => {
        Global.PAGEITEM = data;
        this.contentPagina = data.map(
          (item: Pagina) => {
          return {
            pagina: item.Id,
            totalBotao: item.InterfaceEmissorBotao.length
          };
        });
        this.loadInterface(1);
        if (this.subTimer) { this.subTimer.unsubscribe(); }
      });
    }
  }

  // MONTA A INTERFACE DO TOTEM
  public loadInterface(page: number) {
    this.pageNav = page;

    const item: Pagina = Global.PAGEITEM.filter(p => p.Id === this.pageNav)[0];
    this.pagina = item;

    console.log('Pagina', this.pagina);

    this.tituloPagina = item.InterfaceEmissorTituloPagina;
    this.titlePaddingTop = this.tituloPagina.length === 1 ? '27' : '0';
    this.previousButton = item.BtnVoltar;
    this.links = item.InterfaceEmissorLink;
    this.botoes = item.InterfaceEmissorBotao;
    this.msgExtra = item.Id === 1 ? item.MsgExtra : '';

    if (page !== 1) {
      this.timeIdle = setTimeout(() => {
        this.loadInterface(1);
      }, 40 * 1000);
    } else {
      clearTimeout(this.timeIdle);
    }
  }

  // POSICIONAMENTO DO TEXTO
  public getPosicaoTexto(posicao: number): string {
    switch (posicao) {
      case 1:
        return 'right';
      case 2:
        return 'center';
      case 3:
        return 'left';
    }
  }

  /*
	MOSTRA O BOTÃO DE LINK, SE A PAGINA DE DESTINO DO MESMO
	CONTIVER BOTÃO DE EMISSÃO DE SENHA, CASO CONTRÁRIO O LINK
	NÃO SERÁ EXIBIDO
  */
  public mostraLink(destino: number): string {
    const p = this.contentPagina.filter((item) => {
      return item.pagina === destino;
    });
    if (p[0].totalBotao === 0) {
      return 'none';
    }
    return 'flex';
  }

  // ACIONADO PELOS LINKS EXISTENTES
  public navigate(origem: number, destino: number) {
    console.log('destino', destino);
    setTimeout(() => {
      this.list.push(destino);
      this.loadInterface(destino);
    }, 100);
  }

  // RETORNA UMA PAGINA ANTES
  public previousPage() {
    this.list.pop();
    setTimeout(() => {
      const t = this.list.length;
      this.loadInterface(this.list[this.list.length - 1]);
      if (t === 1) { this.verificaInterface(); }
    }, 100);
  }

  /*
    DIRECIONA PARA TELA DE IMPRESSÃO DE ACORDO COM IdBotao
    SETADO NO ELEMENTO HTML
  */
 public emitSenha(idBotao: number, tipo: number): void {
    if (tipo === 3) {
      console.log('Id botão destino : ', idBotao);
      this._route.navigate(['/print/botao', idBotao]);
    }
 }

}
