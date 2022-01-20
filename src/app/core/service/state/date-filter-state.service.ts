import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

export interface SelectedDate {
  startDate: string,
  endDate: string
}

@Injectable({
  providedIn: 'root'
})
export class DateFilterStateService {
  private selectedDate: BehaviorSubject<SelectedDate> = new BehaviorSubject({ startDate: moment().startOf('day').format('YYYY-MM-DD'), endDate: moment().endOf('day').format('YYYY-MM-DD') });

  get date$() {
    return this.selectedDate.asObservable();
  }

  get seletedDateValue() {
    return this.selectedDate.value;
  }

  setDateFilter(startDate: string, endDate: string) {
    this.selectedDate.next({ startDate, endDate });
  }
}
