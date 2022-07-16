import { UntypedFormGroup, UntypedFormControl, AbstractControl, FormArray } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Formvalidator(form: UntypedFormGroup, errorMessages: any) {
    const formErrors =  Object.create(form.value);

    Object.keys(formErrors).forEach((index) => {
        formErrors[index] = '';
    });


    Object.keys(form.controls).map(field => {
        const control = form.get(field);
        if (control instanceof UntypedFormControl) {
            if (control.errors && !control.pristine) {
                if (errorMessages[field][Object.keys(control.errors)[0]]) {
                    formErrors[field] = errorMessages[field][Object.keys(control.errors)[0]];
                } else {
                    formErrors[field] = Object.keys(control.errors)[0];
                }
            } else {
                formErrors[field] = '';
            }
        } else if (control instanceof UntypedFormGroup) {
            Formvalidator(control, errorMessages);
        }
    });

    return formErrors;

}

export function markDirtyAllControlsWithValue(form: UntypedFormGroup): void {
  const recursiveFunc = (formGroup: UntypedFormGroup) => {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
       control?.markAsDirty();
      if (control instanceof UntypedFormGroup) {
        recursiveFunc(control);
      }
    });
  };
  recursiveFunc(form);
}
