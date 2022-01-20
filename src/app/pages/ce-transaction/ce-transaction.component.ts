import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITransaction } from 'src/app/core/interface/transactions.interface';
import { CategoryPipe } from 'src/app/core/pipes/category.pipe';
import { TransactionService } from 'src/app/core/service/transaction.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TxFormComponent } from './tx-form/tx-form.component';

@Component({
  selector: 'app-ce-transaction',
  templateUrl: './ce-transaction.component.html',
  styleUrls: ['./ce-transaction.component.scss']
})
export class CeTransactionComponent implements OnInit {
  @ViewChild('form')
  txForm: TxFormComponent | undefined;
  constructor(
    private categoryPipe: CategoryPipe,
    private txService: TransactionService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CeTransactionComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: string }) { }


  ngOnInit(): void {
    if (this.isEdit) {
      this.fetchTransaction(this.data.id);
    }
  }

  fetchTransaction(id: string) {
    this.txService.findOne(id).subscribe(data => {
      this.patchForm(data);
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  get categoryTitle(): string {
    return this.txForm?.form.get('type')?.value;
  }

  patchForm(transaction: ITransaction) {
    transaction.category = this.categoryPipe.transform(transaction.category);
    this.txForm?.form.patchValue(transaction);
  }

  deleteTransaction() {
    this.txService.delete(this.data?.id).subscribe(data => {
      this.txService.getAll();
      this.close();
    });
  }

  confirmDelete(): void {
    const message = `Are you sure you want to delete this transaction?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult) {
        this.deleteTransaction();
      }
    });
  }


  get buttonText() {
    return this.isEdit ? 'Update' : 'Save'
  }

  get isEdit() {
    return !!this.data?.id;
  }

  get title(): string {
    return this.isEdit ? 'Update Transaction' : 'Create new Transaction';
  }


  get subtitle(): string {
    return this.isEdit ? 'Modify Transaction' : 'Add new transactions by choosing a Category and entering Amount, Date, Remarks.';
  }
}
