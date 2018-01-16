import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// third party
import { AngularFireDatabaseModule } from 'angularfire2/database';

// components
import { ListItemComponent } from './components/list-item/list-item.component';

// services
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';

@NgModule({
    // register modules here
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule
    ],
    // register components here
    declarations: [
        ListItemComponent
    ],
    // if something needs to be used outside of this module, add it here
    exports: [
        // will be used in meals module and workouts module
        ListItemComponent
    ]
})
export class SharedModule {
    // to prevent duplicate instances of the sharedModule
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService
            ]
        };
    }
}