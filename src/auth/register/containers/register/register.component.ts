import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
    selector: 'register',
    template: `
        <div>
            <auth-form (submitted)="registerUser($event)">
                <h1>Zac P! You gotta fucking register.</h1>
                <h1>*You</h1>
                <a routerLink="/auth/login">Already have an account?</a>
                <button type="submit">
                    Create account
                </button>

                <div class="error" *ngIf="error">
                    {{ error }}
                </div>
            </auth-form>
        </div>
    `
})
export class RegisterComponent {

    error: string;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    async registerUser(event: FormGroup) {
        // destructuring feature
        const { email, password } = event.value;
        // this is grabbing the properties: email and password from event.value(from data)
        // and creates const email and const password with the values! cool

        try {
            await this.authService.createUser(email, password);
            this.router.navigate(['/']); // think of this as being inside the '.then' of a promise
        } catch (err) {
            this.error = err.message;
        }
    }
}