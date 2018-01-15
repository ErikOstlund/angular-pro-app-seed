import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class MealsService {

    // going to set up an observable stream
    meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`)
        .do(next => this.store.set('meals', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}

    get uid() {
        return this.authService.user.uid;
    }

    getMeal(key: string) {
        if(!key) return Observable.of({}); //if no key is given, return empty Observable object
        return this.store.select<Meal[]>('meals') // gets the Meal array from the store
            .filter(Boolean) //if the store has no meals (empty array) it will stop the function
            .map(meals => meals.find((meal: Meal) => meal.$key === key));
            // will map over all meals and find the meal where the meal.$key matches the given key
    }

    addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

    removeMeal(key: string) {
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}