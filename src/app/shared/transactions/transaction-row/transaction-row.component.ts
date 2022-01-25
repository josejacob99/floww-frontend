import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITransaction, TransactionTypes } from 'src/app/core/interface/transactions.interface';

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent implements OnInit {

  @Input()
  transaction: ITransaction | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getIcon() {
    return this.transaction?.type === TransactionTypes.Income ? 'add' : 'remove'
  }
  getAmount() {
    return Math.floor(Math.random() * 1010)
  }

  edit(id: string | undefined) {
    this.router.navigate(['create', id]);
  }
}
