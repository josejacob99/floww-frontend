import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryStateService, DateFilterStateService } from 'src/app/core/service/state';
import { TransactionService } from 'src/app/core/service/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();
  selectedCategory = '';
  constructor(private txService: TransactionService, private dateFilterState: DateFilterStateService) { }


  ngOnInit(): void {
    this.dateFilterState.date$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(date => {
      this.txService.getAll();
    });
  }

  getIcon(odd: boolean) {
    return odd ? 'add' : 'remove'
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
