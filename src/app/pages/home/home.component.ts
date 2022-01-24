import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryStateService, DateFilterStateService } from 'src/app/core/service/state';
import { HomeViews, UIStateService } from 'src/app/core/service/state/ui-state.service';
import { TransactionService } from 'src/app/core/service/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();
  selectedCategory = '';

  isSmallScreen = false;
  currentView = HomeViews.Transactions
  constructor(private txService: TransactionService, private dateFilterState: DateFilterStateService, private uiState: UIStateService) { }


  ngOnInit(): void {
    this.dateFilterState.date$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(date => {
      this.txService.getAll();
    });
    this.uiState.isSmallScreen$.subscribe(isSmallScreen => {
      this.isSmallScreen = isSmallScreen;
    });

    this.uiState.homeView$.subscribe(view => {
      this.currentView = view;
    })
  }

  getIcon(odd: boolean) {
    return odd ? 'add' : 'remove'
  }

  openSideBar() {
    this.uiState.toggle();
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get canShowTransactions() {
    return !this.isSmallScreen || (this.isSmallScreen && this.currentView === HomeViews.Transactions);
  }

  get canOverviewCards() {
    return !this.isSmallScreen || (this.isSmallScreen && this.currentView === HomeViews.Summary);
  }

}
