import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './containers/auth-form/auth-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthFormComponent
    ],
    exports: [ // because we want to use this component in login and register
        AuthFormComponent
    ]
})
export class SharedModule {}