import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ICategories, ICategory } from 'src/app/core/interface/category.interface';
import { CategoryService } from 'src/app/core/service/category.service';
import { CategoryStateService } from '../../core/service/state/category-state.service';
import { DialogComponent } from '../dialog/dialog.component';

export interface Categories {
  name: string;
  path: string[];
  expanded: boolean;
  icon?: string;
  children: Categories[];
}

export interface DialogData {
  name: string;
}

export enum TransactionTypes {
  Income = 'income',
  Expenses = 'expense',
  Debt = 'debt',
  Lend = 'lend',
}

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent {
  @Input()
  expanded = false;

  @Input()
  type: TransactionTypes = TransactionTypes.Expenses;

  @Output()
  categoryChange: EventEmitter<string[]> = new EventEmitter();

  income: Categories[] = [];
  expense: Categories[] = [];
  debt: Categories[] = [];
  lends: Categories[] = [];

  selectedCategory: string[] = [];
  constructor(
    private dialog: MatDialog,
    private categoryState: CategoryStateService,
    private categoryService: CategoryService
  ) {
    this.categoryState.selectedCategory$.subscribe(
      (cat) => (this.selectedCategory = cat)
    );
    this.fetchCategory();
  }

  get categories(): Categories[] {
    switch (this.type) {
      case TransactionTypes.Expenses:
        return this.expense;
      case TransactionTypes.Income:
        return this.income;
      case TransactionTypes.Debt:
        return this.debt;
      case TransactionTypes.Lend:
        return this.lends;
      default:
        return this.expense;
    }
  }

  fetchCategory() {
    this.categoryState.category$.subscribe((category: ICategories) => {
      this.expense = [category.expense];
      this.income = [category.income];
    });
  }

  expandItem(category: string) {
    this.travseAndExpandCategory(category, this.categories);
  }

  travseAndExpandCategory(category: string, list: Categories[]) {
    for (let c of list) {
      if (c.name === category) {
        c.expanded = !c.expanded;
        break;
      } else if (c.children.length) {
        this.travseAndExpandCategory(category, c.children);
      }
    }
  }

  addCategory(e: any, item: Categories) {
    e.stopPropagation();

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        item.children.push({
          name: result,
          children: [],
          path: [...item.path, result],
          expanded: false,
        });
        this.saveCategory();
      }
    });
  }

  selectCategory(item: Categories) {
    if (!this.expanded) {
      item.expanded = !item.expanded;
    }
    this.categoryChange.emit(item.path);
    this.categoryState.selectCategory(item.path);
  }

  isCategorySelected(item: Categories) {
    return item.path === this.selectedCategory;
  }

  saveCategory() {
    switch (this.type) {
      case TransactionTypes.Expenses:
        this.categoryService.updateExpenseCategory(this.expense[0]).subscribe();
        break;
      case TransactionTypes.Income:
        this.categoryService.updateIncomeCategory(this.income[0]).subscribe();
        break;
      case TransactionTypes.Debt:
        break;
      case TransactionTypes.Lend:
        break;
      default:
        break;
    }
  }
}
