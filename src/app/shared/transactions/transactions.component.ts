import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/core/interface/transactions.interface';
import * as moment from 'moment';
import { KeyValue } from '@angular/common';
import { TransactionStateService } from 'src/app/core/service/state/transactions-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnDestroy, OnInit {
  transactions: ITransaction[] = [];
  groupedTransactons: any = {};
  private ngUnsubscribe = new Subject();

  constructor(private transactionsState: TransactionStateService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  keyDescOrder = (a: KeyValue<Date, ITransaction[]>, b: KeyValue<Date, ITransaction[]>): number => {
    return new Date(a.key) > new Date(b.key) ? -1 : (new Date(b.key) > new Date(a.key) ? 1 : 0);
  }

  getTransactions() {
    this.transactionsState.transactions$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(tx => {
      this.grouptransactions(tx);
    })
  }

  grouptransactions(transactions: ITransaction[]) {
    this.groupedTransactons = {};
    transactions.forEach((t: ITransaction) => {
      const formattedDateKey = moment(t.date).format('ll');
      if (formattedDateKey in this.groupedTransactons) {
        this.groupedTransactons[formattedDateKey].push(t);
      } else {
        this.groupedTransactons[formattedDateKey] = [t];
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
