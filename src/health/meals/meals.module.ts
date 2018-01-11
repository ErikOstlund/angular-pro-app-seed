import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// the shared module is handling all data, so must import to access this data
import { SharedModule } from '../shared/shared.module';

// containers
import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.component';

export const ROUTES: Routes = [
    { path: '', component: MealsComponent },
    { path: 'new', component: MealComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule // don't need to call forRoot because it was called 1 level up on HealthModule
    ],
    declarations: [
        MealsComponent,
        MealComponent
    ]
})
export class MealsModule {}