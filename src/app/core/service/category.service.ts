import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from 'src/app/shared/category-tree/category-tree.component';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  endPoint = 'category'
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(environment.api + this.endPoint);
  }

  updateExpenseCategory(category: Categories) {
    return this.http.post(`${environment.api}${this.endPoint}/expense`, category);
  }

  updateIncomeCategory(category: Categories) {
    return this.http.post(`${environment.api}${this.endPoint}/income`, category);
  }
}
