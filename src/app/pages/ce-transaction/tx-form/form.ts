import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Formvalidator,
  markDirtyAllControlsWithValue,
} from '../../../core/utils';

export class TransactionForm {
  formErrors = {
    remarks: '',
    date: '',
    amount: '',
    category: '',
    tags: '',
    type: '',
  };
  errorMessage = {
    date: {
      required: 'Plese enter date',
    },
    amount: {
      required: 'Enter an Amount',
    },
    category: {
      required: 'Choose a category from the tree',
    },
    type: {
      required: 'Choose a transaction type',
    },
  };

  form = new FormGroup({
    id: new FormControl(''),
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    type: new FormControl('expense', Validators.required),
    remarks: new FormControl('', Validators.required),
    tags: new FormControl(''),
  });
  unSubscribe = new Subject();

  constructor() {
    this.form.statusChanges.pipe(takeUntil(this.unSubscribe)).subscribe(() => {
      this.formErrors = Formvalidator(this.form, this.errorMessage);
    });
  }

  validateForm() {
    markDirtyAllControlsWithValue(this.form);
    this.formErrors = Formvalidator(this.form, this.errorMessage);
  }
}
