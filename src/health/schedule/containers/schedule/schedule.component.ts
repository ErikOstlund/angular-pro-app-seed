import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

    open = false;

    date$: Observable<Date>;
    selected$: Observable<any>;
    list$: Observable<Meal[] | Workout[]>;
    schedule$: Observable<ScheduleItem[]>;
    subscriptions: Subscription[] = [];  // going to have mulitple subcriptions

    constructor(
        private store: Store,
        private mealsService: MealsService,
        private workoutsService: WorkoutsService,
        private scheduleService: ScheduleService
    ) {}

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any) {
        this.open = true;
        this.scheduleService.selectSection(event);
    }

    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected');
        this.list$ = this.store.select('list');

        // this will pre-load data for the given subscription
        // So we have access to users meals or workouts when scheduling!
        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.scheduleService.items$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe()
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    assignItem(items: string[]) {
        this.scheduleService.updateItems(items);
        this.closeAssign();
    }

    closeAssign() {
        this.open = false;
    }
}