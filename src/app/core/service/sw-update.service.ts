import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(private swUpdate: SwUpdate, private dialog: MatDialog) {}

  checkForUpdate() {
    this.swUpdate.versionUpdates.subscribe(() => {
      this.showUpdatePromt();
   });
  }

  showUpdatePromt(): void {
    const message = `Update to a newer version`;

    const dialogData = new ConfirmDialogModel("Software update avaialble", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.swUpdate.activateUpdate().then(() => {
        window.location.reload()
     });
    });
  }
}
