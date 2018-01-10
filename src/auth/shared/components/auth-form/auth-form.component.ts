import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'auth-form',
    styleUrls: ['auth-form.component.scss'],
    template: `
        <div class="auth-form">
            <form [formGroup]="form" (ngSubmit)="onSubmit()" >

                <ng-content select="h1"></ng-content>

                <label>
                    <input
                        type="email"
                        placeholder="You're Email Address"
                        formControlName="email">
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="You're Password"
                        formControlName="password">
                </label>

                <div class="error" *ngIf="emailFormat">
                    Email format is jacked.
                </div>
                <div class="error" *ngIf="passwordInvalid">
                    No password = No entry
                </div>

                <ng-content select=".error"></ng-content>

                <div class="auth-form__action">
                    <ng-content select="button"></ng-content>
                </div>

                <div class="auth-form__toggle">
                    <ng-content select="a"></ng-content>
                </div>

            </form>
        </div>
    `
})
export class AuthFormComponent {

    //events
    @Output()
    submitted = new EventEmitter<FormGroup>();

    form = this.fb.group({
        email: ['', Validators.email],
        password: ['', Validators.required]
    })

    constructor(
        private fb: FormBuilder
    ) {}

    onSubmit(){ // public method because it emits an event up to the login component
        if (this.form.valid) {
            this.submitted.emit(this.form);
        }
    }

    get emailFormat() {
        const control = this.form.get('email');
        return control.hasError('email') && control.touched;
    }

    get passwordInvalid() {
        const control = this.form.get('password');
        return control.hasError('required') && control.touched;
    }

}