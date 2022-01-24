import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITransaction } from '../interface/transactions.interface';
import { CategoryStateService, DateFilterStateService } from './state';
import { TransactionStateService } from './state/transactions-state.service';
import * as moment from 'moment';
import { UIStateService } from './state/ui-state.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  endPoint = 'transactions'
  constructor(private http: HttpClient, private transactionsState: TransactionStateService,
    private categoryState: CategoryStateService,
    private uiState: UIStateService,
    private dateFilter: DateFilterStateService) {}

  getAll() {
    this.uiState.showSpinner();
    const startDate = moment(this.dateFilter.seletedDateValue.startDate).startOf('day').format('YYYY-MM-DDTHH:mm');
    const endDate =  moment(this.dateFilter.seletedDateValue.endDate).endOf('day').format('YYYY-MM-DDTHH:mm');
    const category = this.categoryState.seletedCategory as string[];
    let params = new HttpParams();

    if(category) {
      params = params.append('category', category.toString());
    }
    return this.http.get<ITransaction[]>(`${environment.api}${this.endPoint}/${startDate}/${endDate}`, {params}).subscribe(data => {
      this.transactionsState.setTransactions(data);
      this.uiState.hideSpinner();
    });
  }

  save(transaction: ITransaction) {
    this.uiState.showSpinner();
    return this.http.post(environment.api + this.endPoint, transaction);
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}${this.endPoint}/${id}`);
  }

  update(transaction: ITransaction, id: string) {
    return this.http.put(`${environment.api}${this.endPoint}/${id}`  , transaction);
  }

  findOne(id: string): Observable<ITransaction> {
    return this.http.get<ITransaction>(`${environment.api}${this.endPoint}/${id}`);
  }
}
