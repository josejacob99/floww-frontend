import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITransaction, TransactionTypes } from 'src/app/core/interface/transactions.interface';
import { CeTransactionComponent } from 'src/app/pages/ce-transaction/ce-transaction.component';

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent implements OnInit {

  @Input()
  transaction: ITransaction | undefined;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getIcon() {
    return this.transaction?.type === TransactionTypes.Income ? 'add' : 'remove'
  }
  getAmount() {
    return Math.floor(Math.random() * 1010)
  }

  edit(id: string | undefined) {
    const dialogRef = this.dialog.open(CeTransactionComponent, {
      width: '75%',
      disableClose: true,
      data: {id}
    });
  }
}
