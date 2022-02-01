import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticationGuard } from './guards/authenticated.guard';
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
  providers: [CurrencyPipe, CategoryPipe, AuthenticationGuard]
})
export class CoreModule { }
