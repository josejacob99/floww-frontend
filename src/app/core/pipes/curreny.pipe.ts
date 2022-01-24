import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "usercurreny"
})
export class UserCurreny implements PipeTransform {

  constructor(private currencyPipe:CurrencyPipe) {}

  transform(value: string | number |undefined): string | null {
    if(!value) {
      return this.currencyPipe.transform(0, 'INR');
    }
     return this.currencyPipe.transform(value, 'INR');
  }
}
