import { Component, OnInit } from '@angular/core';
import { ITransaction, TransactionTypes } from 'src/app/core/interface/transactions.interface';
import { TransactionStateService } from 'src/app/core/service/state/transactions-state.service';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})
export class CategoryOverviewComponent implements OnInit {
  groupedTransactons: any = [];
  totalExpense = 0;
  totalIncome = 0;
  constructor(private txState: TransactionStateService) { }

  ngOnInit(): void {
    this.txState.transactions$.subscribe(t => {
      this.totalIncome = this.calculateIncome(t);
      this.totalExpense = this.calculateExpenses(t);
      this.newgrouptransactions(t);
    });
  }

  newgrouptransactions(transactions: ITransaction[]) {
    const transactionsGroup: any = {}
    const previousCategoryLength = this.groupedTransactons.length;
    transactions.forEach((t: ITransaction) => {
      const category = t.category;
      if (category in transactionsGroup) {
        transactionsGroup[category].push(t);
      } else {
        transactionsGroup[category] = [t];
      }
    });
    const categoryGroupLength = Object.keys(transactionsGroup).length;
    let i = 0;
    if (categoryGroupLength < previousCategoryLength) {
      for (let y = categoryGroupLength - 1; y < this.groupedTransactons.length; y++) {
        this.groupedTransactons.splice(y);
      }
    }
    for (let key in transactionsGroup) {
      const totalAmt = this.calculateCategoryTotalAmount(transactionsGroup[key]);
      const type = transactionsGroup[key][0].type;
      const category = key.split(',');
      this.groupedTransactons[i] = {
        category: category[category.length - 2],
        total: totalAmt,
        type,
        percent: type === TransactionTypes.Income ? this.getPercentage(this.totalIncome, totalAmt) : this.getPercentage(this.totalExpense, totalAmt)
      }
      i++;
    }
    this.groupedTransactons.sort(function (a: any, b: any) {
      return b.total - a.total;
    });
  }


  calculateCategoryTotalAmount(transactions : ITransaction[]) {
   return transactions.reduce(
      (accumulator: number, currentValue: ITransaction) => +accumulator + +currentValue.amount,
      0
    );
  }



  getPercentage(total: number, amount: number) {
    return ((amount / total) * 100).toFixed(0);
  }

  calculateIncome(transactions: ITransaction[]) {
    return transactions
      .filter(t => t.type === TransactionTypes.Income)
      .reduce(
        (accumulator, currentValue) => +accumulator + +currentValue.amount,
        0
      );
  }

  calculateExpenses(transactions: ITransaction[]) {
    return transactions
      .filter(t => t.type === TransactionTypes.Expenses)
      .reduce(
        (accumulator, currentValue) => +accumulator + +currentValue.amount,
        0
      );


  }
}
