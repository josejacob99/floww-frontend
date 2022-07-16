import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';
import { DateFilterStateService } from '../../core/service/state';
import { TransactionService } from 'src/app/core/service/transaction.service';

export enum QuickFilters {
  Today,
  ThisWeek,
  ThisMonth,
  ThreeMonths,
  TwoMonths
}

export interface DateRange {
  start: string,
  end: string
}

@UntilDestroy()
@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {
  dateRangeControl: FormGroup = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required)
  });;
  quickFilters = QuickFilters;

  constructor(private dateStateService: DateFilterStateService, private txService: TransactionService) {}

  ngOnInit(): void {
    this.listenDateChange();
    this.quickFilterChange(QuickFilters.ThreeMonths);
  }


  listenDateChange() {
    this.dateRangeControl.valueChanges.pipe(untilDestroyed(this), debounceTime(200), distinctUntilChanged()).subscribe((value) => {
      if (this.dateRangeControl.valid) {
        this.setDateInState();
      }
    });
  }


  quickFilterChange(filter: QuickFilters) {
    switch (filter) {
      case QuickFilters.Today:
        this.setFilterDate(moment().startOf('day').format('YYYY-MM-DD'), moment().endOf('day').format('YYYY-MM-DD'));
        break;
      case QuickFilters.ThisWeek:
        this.setFilterDate(moment().startOf('week').format('YYYY-MM-DD'), moment().endOf('week').format('YYYY-MM-DD'));
        break;
      case QuickFilters.ThisMonth:
        this.setFilterDate(moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD'));
        break;
      case QuickFilters.ThreeMonths:
        this.setFilterDate(moment().subtract(3, 'months').startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD'));
        break;
      case QuickFilters.TwoMonths:
          this.setFilterDate(moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD'));
          break;
      default:
        break;
    }

  }

  private setFilterDate(startDate: string, endDate: string) {
       this.dateRangeControl.get('start')?.setValue(new Date(startDate));
       this.dateRangeControl.get('end')?.setValue(new Date(endDate));
      this.setDateInState();
  }

  private setDateInState() {
    this.dateStateService.setDateFilter(this.dateRangeControl.value.start, this.dateRangeControl.value.end);
  }
}
