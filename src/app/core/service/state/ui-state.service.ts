import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum HomeViews {
  Transactions = 'tx',
  Summary = 'summary'
}


@Injectable({
  providedIn: 'root'
})
export class UIStateService {
  private _sidebarState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _homeview: BehaviorSubject<HomeViews> = new BehaviorSubject<HomeViews>(HomeViews.Transactions);
  private _isSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  get sidebarState$() {
    return this._sidebarState.asObservable();
  }

  get spinnerState$() {
    return this._showSpinner.asObservable();
  }

  get homeView$() {
    return this._homeview.asObservable();
  }

  get currentsidebarState() {
    return this._sidebarState.value;
  }

  get isSmallScreenValue() {
    return this._isSmallScreen.value;
  }


  get isSmallScreen$() {
    return this._isSmallScreen.asObservable();
  }

  toggle() {
    if(this.isSmallScreenValue && !this.currentsidebarState) {
      this.document.body.classList.add('sidebar-open');
    } else {
      this.document.body.classList.remove('sidebar-open')
    }
    this._sidebarState.next(!this.currentsidebarState);
  }

  set sidebarState(value: boolean) {
    this._sidebarState.next(value);
  }

  set isSmallScreen(value: boolean) {
    this._isSmallScreen.next(value);
  }

  showSpinner() {
    this._showSpinner.next(true);
  }


  hideSpinner() {
    this._showSpinner.next(false);
  }

  toggleHomeView() {
    this._homeview.value === HomeViews.Transactions ? this._homeview.next(HomeViews.Summary) : this._homeview.next(HomeViews.Transactions);
  }
}
