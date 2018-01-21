import { AfterViewInit, Directive, ElementRef, Host, HostBinding, Input, OnChanges, Renderer2 } from '@angular/core';
import { ErrorDetails, NgxMessagesDirective } from './ngx-messages.directives';

import 'rxjs/add/operator/filter';

@Directive({
    selector: '[ngxMessage]',
    exportAs: 'ngxMessage'
})
export class NgxMessageDirective implements OnChanges, AfterViewInit {

    @Input() ngxMessage;

    @Input() state: Array<string> | string;

    @HostBinding('hidden')
    hidden = true;


    constructor(private ngxMessages: NgxMessagesDirective, private elRef: ElementRef) {

        ngxMessages.subject
            .filter((data: ErrorDetails) => data && (data.errorName === this.ngxMessage || data.errorName === null))
            .filter((data: ErrorDetails) => {
                if (Array.isArray(this.state)) {
                    return this.state.some((state) => data.control[state] === true);
                } else {
                    return data.control[this.state] === true;
                }
            })
            .subscribe((data) => {
                if (data.errorName === null) {
                    this.hidden = true;
                } else {
                    const idElement = this.elRef.nativeElement.getAttribute('id');
                    if (this.ngxMessages.isReactive) {
                        const inputEl = document.querySelector('input[formControlName=\'' + this.ngxMessages.formControlName + '\']') as HTMLInputElement;
                        const ids = inputEl.getAttribute('aria-describedby') ? inputEl.getAttribute('aria-describedby') : '';
                        inputEl.focus();
                        if (idElement) {
                            inputEl.setAttribute('aria-describedby', `${ids} ${idElement}`);
                        } else {
                            inputEl.setAttribute('aria-describedby', `${ids} wai_${this.ngxMessages.formControlName}`);
                            this.elRef.nativeElement.setAttribute('id', `wai_${this.ngxMessages.formControlName}`);
                        }
                    } else {
                        // add attribute aria-describedby
                        const inputEl = document.querySelector('input[name=\'' + this.ngxMessages.formControlName + '\']') as HTMLInputElement;
                        const ids = inputEl.getAttribute('aria-describedby') ? inputEl.getAttribute('aria-describedby') : '';
                        inputEl.focus();
                        if (idElement) {
                            inputEl.setAttribute('aria-describedby', `${ids} ${idElement}`);
                        } else {
                            inputEl.setAttribute('aria-describedby', `${ids} wai_${this.ngxMessages.formControlName}`);
                            this.elRef.nativeElement.setAttribute('id', `wai_${this.ngxMessages.formControlName}`);
                        }
                    }

                    this.hidden = false;
                    this.ngxMessages.hidden = false;

                }
            });
    }


    ngOnChanges() {
        console.log('change : ' + this.ngxMessages.control);
    }

    ngAfterViewInit() {
        //  console.log(this.ngxMessages.control[this.state]);
        console.log('after : ' + this.ngxMessages.control);

        setTimeout(() => {
            //  console.log(this.ngxMessages.control[this.state]);
            console.log('timeout : ' + this.ngxMessages.control);
        });
    }

}
