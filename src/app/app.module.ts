import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}


// var config = {
//   apiKey: "AIzaSyDRVR06pQONLzX7gi-pA9BkAxlwVw3aZNw",
//   authDomain: "ua-fitness-app-fa6b4.firebaseapp.com",
//   databaseURL: "https://ua-fitness-app-fa6b4.firebaseio.com",
//   projectId: "ua-fitness-app-fa6b4",
//   storageBucket: "ua-fitness-app-fa6b4.appspot.com",
//   messagingSenderId: "812624025137"
// };
