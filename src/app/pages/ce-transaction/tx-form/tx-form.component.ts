import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITransaction } from 'src/app/core/interface/transactions.interface';
import { CategoryStateService } from 'src/app/core/service/state';
import { TransactionService } from '../../../core/service/transaction.service';
import { TransactionForm } from './form';

@Component({
  selector: 'app-tx-form',
  templateUrl: './tx-form.component.html',
  styleUrls: ['./tx-form.component.scss']
})
export class TxFormComponent extends TransactionForm implements OnInit {
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

    this.setDefaultDate();
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
