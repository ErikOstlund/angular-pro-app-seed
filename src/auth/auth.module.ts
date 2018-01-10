import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// 3rd party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'register', loadChildren: './register/register.module#RegisterModule' }
        ]
    }
];

export const firebaseConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyDRVR06pQONLzX7gi-pA9BkAxlwVw3aZNw",
    authDomain: "ua-fitness-app-fa6b4.firebaseapp.com",
    databaseURL: "https://ua-fitness-app-fa6b4.firebaseio.com",
    projectId: "ua-fitness-app-fa6b4",
    storageBucket: "ua-fitness-app-fa6b4.appspot.com",
    messagingSenderId: "812624025137"
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot() // call forRoot to prevent duplicate instances (from shared.module)
    ]
})
export class AuthModule {}