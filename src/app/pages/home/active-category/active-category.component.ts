import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryStateService } from 'src/app/core/service/state';
import { TransactionService } from 'src/app/core/service/transaction.service';

@Component({
  selector: 'app-active-category',
  templateUrl: './active-category.component.html',
  styleUrls: ['./active-category.component.scss']
})
export class ActiveCategoryComponent implements OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();
  selectedCategory = '';
  constructor(private txService: TransactionService, private categoryState: CategoryStateService) { }

  ngOnInit(): void {
    this.categoryState.selectedCategory$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(c => {
      this.selectedCategory = c.join(' / ');
      this.txService.getAll();
    });
  }

  clearCategory() {
    this.categoryState.selectCategory([]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
