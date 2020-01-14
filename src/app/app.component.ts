import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceService } from './services/interface.services';
import { VersaoEmissor } from './models/configs.model';
import { Global } from './app.globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private urlServer: string;
  public versao: string;

  constructor(
    private _http: HttpClient,
    private _interface: InterfaceService) {
    this._interface.getInterfaceContent().subscribe(
      data => sessionStorage.setItem('interface', JSON.stringify(data))
    );
    this._interface.getConfigUrl().subscribe(
      data => {
        this.urlServer = data;
        this.getVersao();
      }
    );
  }

  /*
    RETORNA A INFORMAÇÃO DA VERSÃO DO EMISSOR
  */
  public getVersao() {
    const url = this.urlServer + Global.VERSAO_EMISSOR;
    this._http.get(url).subscribe(
      (data: VersaoEmissor) => {
        this.versao = data.ret;
      },
      error => {
        this.versao = '7.0.3';
      }
    );
  }
}
