import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './containers/login/login.component';

export const ROUTES: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule // this gives us access to the auth-form inside LoginComponent
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {}