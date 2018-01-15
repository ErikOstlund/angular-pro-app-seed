import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    templateUrl: 'meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {

    meal$: Observable<Meal>;
    // we make meal an observable so when user is in a meal and goes back to list of meals, all meals are loaded
    subscription: Subscription;

    constructor(
        private mealsService: MealsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.mealsService.meals$.subscribe();
        this.meal$ = this.route.params
            .switchMap(param => this.mealsService.getMeal(param.id));
            //as soon as the route-params change, the meal-service is automatically called again with the changed params and the previouse call is canceled so we won't receive outdated data
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async addMeal(event: Meal) {
        await this.mealsService.addMeal(event);
        this.backToMeals();
    }

    backToMeals() {
        this.router.navigate(['meals']);
    }
}