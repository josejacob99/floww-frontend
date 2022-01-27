import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { CategoryPopupComponent } from '../category-popup/category-popup.component';
import { TxFormComponent } from '../tx-form/tx-form.component';
import { TransactionService } from 'src/app/core/service/transaction.service';
import { ITransaction } from 'src/app/core/interface/transactions.interface';
import { CategoryPipe } from 'src/app/core/pipes/category.pipe';
import { ActivatedRoute } from '@angular/router';
import { UIStateService } from 'src/app/core/service/state/ui-state.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ce-page',
  templateUrl: './ce-page.component.html',
  styleUrls: ['./ce-page.component.scss']
})
export class CePageComponent implements OnInit {
  @ViewChild('form')
  txForm: TxFormComponent | undefined;
  isEdit = false;
  constructor(private dialog: MatDialog, private location: Location, private route: ActivatedRoute,
    private txService: TransactionService, private categoryPipe: CategoryPipe, private uiState: UIStateService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.fetchTransaction(params.id);
        this.isEdit = true;
      }
    });
  }

  fetchTransaction(id: string) {
    this.uiState.showSpinner();
    this.txService.findOne(id).subscribe(data => {
      this.patchForm(data);
      this.uiState.hideSpinner();
    })
  }

  patchForm(transaction: ITransaction) {
    transaction.category = this.categoryPipe.transform(transaction.category);
    this.txForm?.form.patchValue(transaction);
  }

  get title(): string {
    return this.isEdit ? 'Update Transaction' : 'Create new Transaction';
  }

  openCategoryTree() {
    const txType = this.txForm?.form.value.type;
    const dialogRef = this.dialog.open(CategoryPopupComponent, {
      width: '100%',
      data: {txType}
    });
  }

  back() {
    this.location.back();
  }

  deleteTransaction() {
    this.uiState.showSpinner();
    this.txService.delete(this.txForm?.form.get('id')?.value).subscribe(data => {
      this.txService.getAll();
      this.back();
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


  get subtitle(): string {
    return this.isEdit ? 'Modify Transaction' : 'Add a new transactions';
  }

  get buttonText() {
    return this.isEdit ? 'Update' : 'Save'
  }



}
