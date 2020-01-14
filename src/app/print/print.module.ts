import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintComponent } from './print.component';
import { InitModule } from '../init/init.module';

@NgModule({
  imports: [
    CommonModule,
    InitModule,
  ],
  declarations: [
    PrintComponent
  ]
})
export class PrintModule { }
