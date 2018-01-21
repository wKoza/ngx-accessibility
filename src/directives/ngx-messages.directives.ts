import { AfterViewInit, Directive, HostBinding, Input, OnChanges, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ErrorDetails {
    control: AbstractControl;
    errorName: string;
}

@Directive({
    selector: '[ngxMessages]',
    exportAs: 'ngxMessages'
})
export class NgxMessagesDirective implements OnChanges, AfterViewInit {

    @Input('ngxMessages') formControlName;
    control: AbstractControl;

    subject = new BehaviorSubject<ErrorDetails>(null);

    @HostBinding('hidden')
    hidden = true;

    isReactive: boolean = null;


    constructor(@Optional() private ngForm: NgForm, @Optional() private formGroup: FormGroupDirective) {
        if (this.ngForm) {
            this.isReactive = false;
        } else if (this.formGroup) {
            this.isReactive = true;
        } else {
            throw new Error(`You haven't declaring a directive NgForm or FormGroup in your form.`);
        }
    }


    ngOnChanges() {
        //      this.control = this.ngForm.form.controls[this.formControlName];
        //     console.log(this.control);
    }

    ngAfterViewInit() {
        setTimeout(() => {

            if (!this.isReactive) {
                this.control = this.ngForm.form.controls[this.formControlName];
            } else {
                this.control = this.formGroup.form.controls[this.formControlName];
            }

            this.control.valueChanges.subscribe(
                (data) => {
                    this.onValueChanged();
                }
            );
        });
    }


    onValueChanged() {
        // reset all errors
        this.subject.next({control: this.control, errorName: null});
        this.hidden = true;

        if (this.control.errors) {
            for (const errorName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(errorName)) {
                    this.subject.next({control: this.control, errorName: errorName});
                    console.log('emit');
                }
            }
        }
    }

}
