import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICategories, ICategory } from '../../interface/category.interface';
export interface SelectedCategory {
  category: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryStateService {
  private _selectedCategory: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  private _categories: BehaviorSubject<ICategories> = new BehaviorSubject({
    income: this.emptyCategory(),
    expense: this.emptyCategory()
  } as ICategories);

  get category$() {
    return this._categories.asObservable();
  }

  get selectedCategory$() {
    return this._selectedCategory.asObservable();
  }

  get selectedCategory() {
    return this._selectedCategory.value;
  }

  selectCategory(categories: string[]) {
    this._selectedCategory.next(categories);
  }

  setCategories(categories: ICategories) {
    this._categories.next(categories);
  }

  clearCategorySelection() {
    this.selectCategory([]);
  }

  private emptyCategory(): ICategory {
    return {
      name: '',
      path: [],
      expanded: false,
      children: []
    }
  }
}
