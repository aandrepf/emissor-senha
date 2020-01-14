import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Global } from './../app.globals';
import { InterfaceEmissor, Pagina } from '../models/interface.model';
import { Urls } from './../models/configs.model';
import { Router } from '@angular/router';

@Injectable()
export class InterfaceService {
  public interfacePagina: number;
  public idVolta = [];

  constructor(private _http: HttpClient, private router: Router) {}

  getInterfacePage(page: number) {
    // this.interfacePagina = page;
    return page;
  }

  getInterfaceContent(): Observable<Pagina[]> {
    return this._http.get(`${Global.CONFIG_TELA_INTERFACE}`).pipe(
      map((data: InterfaceEmissor) => {
        return data.InterfaceEmissorPagina;
      })
    );
  }

  getConfigUrl(): Observable<any> {
    return this._http.get(`${Global.CONFIG_URL}`).pipe(
      map((data: Urls) => {
        return data.UrlServer;
      })
    );
  }

  disableMouseSecondClick() {
    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }
}
