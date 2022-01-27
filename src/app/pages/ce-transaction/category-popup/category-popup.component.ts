import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.scss']
})
export class CategoryPopupComponent {

  constructor( public dialogRef: MatDialogRef<CategoryPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  close() {
    this.dialogRef.close();
  }

}
