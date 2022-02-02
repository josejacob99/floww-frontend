import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from 'src/app/shared/category-tree/category-tree.component';
import { environment } from '../../../environments/environment';
import { ICategories, ICategory } from '../interface/category.interface';
import { CategoryStateService } from './state';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  endPoint = 'category'
  constructor(private http: HttpClient, private categoryState: CategoryStateService) {}

  getAll() {
    return this.http.get<ICategories>(environment.api + this.endPoint).subscribe(data => {
      this.categoryState.setCategories({
        income: data.income,
        expense: data.expense
      });
    });
  }

  updateExpenseCategory(category: Categories) {
    return this.http.post(`${environment.api}${this.endPoint}/expense`, category);
  }

  updateIncomeCategory(category: Categories) {
    return this.http.post(`${environment.api}${this.endPoint}/income`, category);
  }
}
