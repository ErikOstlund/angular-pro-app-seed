import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// the shared module is handling all data, so must import to access this data
import { SharedModule } from '../shared/shared.module';

// components
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

// containers
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutComponent } from './containers/workout/workout.component';

export const ROUTES: Routes = [
    { path: '', component: WorkoutsComponent },
    { path: 'new', component: WorkoutComponent },
    { path: ':id', component: WorkoutComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule // don't need to call forRoot because it was called 1 level up on HealthModule
    ],
    declarations: [
        WorkoutsComponent,
        WorkoutComponent,
        WorkoutFormComponent
    ]
})
export class WorkoutsModule {}