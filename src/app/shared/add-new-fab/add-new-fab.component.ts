import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CeTransactionComponent } from 'src/app/pages/ce-transaction/ce-transaction.component';

@Component({
  selector: 'app-add-new-fab',
  templateUrl: './add-new-fab.component.html',
  styleUrls: ['./add-new-fab.component.scss']
})
export class AddNewFabComponent {
  constructor(private dialog: MatDialog) {}

  addTransaction() {
    const dialogRef = this.dialog.open(CeTransactionComponent, {
      width: '75%',
      disableClose: true
      // data: {name: this.name, animal: this.animal}
    });
  }
}
