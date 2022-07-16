import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  form = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    date: new UntypedFormControl('', Validators.required),
    amount: new UntypedFormControl('', Validators.required),
    category: new UntypedFormControl('', Validators.required),
    type: new UntypedFormControl('expense', Validators.required),
    remarks: new UntypedFormControl('', Validators.required),
    tags: new UntypedFormControl([]),
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
