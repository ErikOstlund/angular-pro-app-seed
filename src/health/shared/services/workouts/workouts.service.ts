import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Workout {
    name: string,
    type: string,
    strength: any,
    endurance: any,
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class WorkoutsService {

    // setting up an observable stream
    workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
        .do(next => this.store.set('workouts', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}

    get uid() {
        return this.authService.user.uid;
    }

    getWorkout(key: string) {
        if(!key) return Observable.of({}); //if no key is given, return empty Observable object
        return this.store.select<Workout[]>('workouts') // gets the workouts array from the store
            .filter(Boolean) //if the store has no workouts (empty array) it will stop the function
            .map(workouts => workouts.find((workout: Workout) => workout.$key === key));
            // will map over all workouts and find the workout where the workout.$key matches the given key
    }

    addWorkout(workout: Workout) {
        return this.db.list(`workouts/${this.uid}`).push(workout);
    }

    updateWorkout(key: string, workout: Workout) {
        // we use db.object because we are dealing with an individual workout
        return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
    }

    removeWorkout(key: string) {
        return this.db.list(`workouts/${this.uid}`).remove(key);
    }
}