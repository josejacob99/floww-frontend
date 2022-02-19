import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(private swUpdate: SwUpdate) {}

  checkForUpdate() {
    this.swUpdate.versionUpdates.subscribe((event) => {
      console.log('current version: ', event.type);
      if (confirm('Software update avaialble.')) {
          this.swUpdate.activateUpdate().then(() => {
             //Perform your action here
             window.location.reload()
          });
      }
   });
  }
}
