import { Component, OnInit } from '@angular/core';
import { ITransaction, TransactionTypes } from 'src/app/core/interface/transactions.interface';
import { TransactionStateService } from 'src/app/core/service/state/transactions-state.service';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {
  totalExpense = 0;
  totalIncome = 0;
  totalTransactions =0;
  constructor(private txState: TransactionStateService) { }

  ngOnInit(): void {
    this.txState.transactions$.subscribe(t => {
      this.totalTransactions = t.length;
      this.totalIncome = this.calculateIncome(t);
      this.totalExpense = this.calculateExpenses(t);
    });
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
