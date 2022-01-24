import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface SelectedCategory {
  category: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryStateService {
  private selectedCategory: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  get category$() {
    return this.selectedCategory.asObservable();
  }

  get seletedCategory() {
    return this.selectedCategory.value;
  }

  selectCategory(categories: string[]) {
    this.selectedCategory.next(categories);
  }
}
