import { HttpClient } from '@angular/common/http';
import { InterfaceService } from './../services/interface.services';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { Global } from '../app.globals';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  private sub: Subscription;
  private urlServer: string;

  public waiting = true;
  public senha = false;
  public error = false;

  public valorSenha: string;

  constructor(
    private _active: ActivatedRoute,
    private _router: Router,
    private _interfaceService: InterfaceService,
    private _userIdle: UserIdleService,
    private _http: HttpClient) { }

  ngOnInit() {
    this._interfaceService.getConfigUrl().subscribe(
      data => this.urlServer = data
    );

    this.sub = this._active.params.subscribe(params => {
      setTimeout(() => {
        this.imprimirSenha(params['id']);
      }, 3000);
    });

    this._userIdle.stopWatching();
    this._userIdle.stopTimer();
  }

  imprimirSenha(idBotao: number) {

    const params = [
      'btn=' + idBotao,
      '&btnID=' + idBotao
    ];

    const url = this.urlServer +  Global.BASE_EMITIR_TICKET + params.join('');
    this._http.post(url, '').subscribe(
      (data: any) => {
        this.valorSenha = data.Ticket;
        console.log('senha', this.valorSenha);
        this.senha = true;
        this.waiting = false;
        setTimeout(() => {
          this._router.navigate(['/']);
        }, 3000);
      },
      error => {
        this.error = true;
        this.waiting = false;
        setTimeout(() => { this._router.navigate(['/']); }, 3000);
      }
    );
  }
}
