import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITransaction } from 'src/app/core/interface/transactions.interface';
import { CategoryStateService } from 'src/app/core/service/state';
import { TransactionService } from '../../../core/service/transaction.service';
import { TransactionForm } from './form';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-tx-form',
  templateUrl: './tx-form.component.html',
  styleUrls: ['./tx-form.component.scss']
})
export class TxFormComponent extends TransactionForm implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  @Output()
  closeModal = new EventEmitter();

  @Output()
  categoryClick = new EventEmitter();
  constructor(private txService: TransactionService, private categoryState: CategoryStateService) {
    super();
  }

  ngOnInit(): void {
    this.categoryState.selectedCategory$.subscribe(data => {
      this.handleCategoryChange(data);
    });

    this.form.get('tags')?.valueChanges.subscribe(data => {
      this.tags = data;
    });

    this.setDefaultDate();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
    this.form.get('tags')?.setValue(this.tags);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.form.get('tags')?.setValue(this.tags);
  }

  setDefaultDate() {
    this.form.get('date')?.setValue(new Date());
  }

  handleCategoryChange(categoryPath: string[]) {
    this.form.get('category')?.setValue(categoryPath.join(" / "))
  }


  handleCategoryClick() {
    this.categoryClick.emit();
  }

  saveTransaction() {
    if (this.form.valid) {
      const tx: ITransaction = this.form.value;
      tx.category = ',' + tx.category.toString().split(' / ').toString() + ',';

      if (this.transactionId) {
        this.txService.update(tx, this.form.get('id')?.value).subscribe(x => {
          this.categoryState.clearCategorySelection();
          this.txService.getAll();
        });
      } else {
        this.txService.save(tx).subscribe(x => {
          this.categoryState.clearCategorySelection();
          this.txService.getAll();
        });
      }


      this.closeModal.emit(true);
    }
  }

  get transactionId() {
    return this.form.get('id')?.value;
  }
}
