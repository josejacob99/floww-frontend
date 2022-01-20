import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Formvalidator(form: FormGroup, errorMessages: any) {
    const formErrors =  Object.create(form.value);

    Object.keys(formErrors).forEach((index) => {
        formErrors[index] = '';
    });


    Object.keys(form.controls).map(field => {
        const control = form.get(field);
        if (control instanceof FormControl) {
            if (control.errors && !control.pristine) {
                if (errorMessages[field][Object.keys(control.errors)[0]]) {
                    formErrors[field] = errorMessages[field][Object.keys(control.errors)[0]];
                } else {
                    formErrors[field] = Object.keys(control.errors)[0];
                }
            } else {
                formErrors[field] = '';
            }
        } else if (control instanceof FormGroup) {
            Formvalidator(control, errorMessages);
        }
    });

    return formErrors;

}

export function markDirtyAllControlsWithValue(form: FormGroup): void {
  const recursiveFunc = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
       control?.markAsDirty();
      if (control instanceof FormGroup) {
        recursiveFunc(control);
      }
    });
  };
  recursiveFunc(form);
}
