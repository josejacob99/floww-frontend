import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryPipe } from './pipes/category.pipe';
import { UserCurreny } from './pipes/curreny.pipe';


@NgModule({
  declarations: [
    CategoryPipe,
    UserCurreny
  ],
  imports: [
  ],
  exports: [
    CategoryPipe,
    UserCurreny
  ],
  providers: [CurrencyPipe, CategoryPipe]
})
export class CoreModule { }
