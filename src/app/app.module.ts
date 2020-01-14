import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// MÓDULOS
import { InterfaceModule } from './interface/interface.module';
import { PrintModule } from './print/print.module';
import { InitModule } from './init/init.module';
import { UserIdleModule } from 'angular-user-idle';

// COMPONENTES
import { AppComponent } from './app.component';

// rotas
import { interfaceRouting } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InterfaceModule,
    PrintModule,
    interfaceRouting,
    // idle: 10 segundos, timeout: 15 segundos, ping: 120 segundos
    UserIdleModule.forRoot({idle: 15, timeout: 15, ping: 120})
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
