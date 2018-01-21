import { NgxMessageDirective } from './directives/ngx-message.directives';
import { NgModule } from '@angular/core';
import { NgxMessagesDirective } from './directives/ngx-messages.directives';


const ngxDeclarations = [
    NgxMessageDirective,
    NgxMessagesDirective
];



@NgModule({
    declarations: [
        ...ngxDeclarations
    ],
    exports: [
        ...ngxDeclarations
    ]
})
export class NgxAccessibilityModule {

}
