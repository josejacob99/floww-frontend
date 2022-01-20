import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { CeTransactionComponent } from './ce-transaction.component';
import { TxFormComponent } from './tx-form/tx-form.component';


@NgModule({
  declarations: [
    CeTransactionComponent,
    TxFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ],
  exports: [],
  providers: [],
})
export class CetxModule { }
