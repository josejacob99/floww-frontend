import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITransaction } from '../../interface/transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionStateService {
  private transactions: BehaviorSubject<ITransaction[]> = new BehaviorSubject<ITransaction[]>([]);

  get transactions$() {
    return this.transactions.asObservable();
  }

  setDateFilter(transactions: ITransaction[]) {
    this.transactions.next(transactions);
  }
}
