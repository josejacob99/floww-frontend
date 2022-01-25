import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TxFormComponent } from './tx-form/tx-form.component';
import { CePageComponent } from './ce-page/ce-page.component';
import { Route, RouterModule } from '@angular/router';
import { CategoryPopupComponent } from './category-popup/category-popup.component';

export const routes: Route[] = [
  {
    path: '', component: CePageComponent
  },
  {
    path: ':id', component: CePageComponent
  },
];

@NgModule({
  declarations: [
    TxFormComponent,
    CePageComponent,
    CategoryPopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [],
})
export class CetxModule { }
