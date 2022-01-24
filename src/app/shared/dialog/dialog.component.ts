import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../category-tree/category-tree.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  catname = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    this.dialogRef.close(this.catname);
  }

}
