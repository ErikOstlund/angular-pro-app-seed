import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface ScheduleItem {
    meals: Meal[],
    workouts: Workout[],
    section: string,
    timestamp: number,
    $key?: string
}

export interface ScheduleList {
    morning?: ScheduleItem,
    lunch?: ScheduleItem,
    evening?: ScheduleItem,
    snacks?: ScheduleItem,
    [key: string]: any
}

@Injectable()
export class ScheduleService {

    private date$ = new BehaviorSubject(new Date());
    private section$ = new Subject();
    private itemList$ = new Subject();

    items$ = this.itemList$
        .withLatestFrom(this.section$)
        .map(([ items, section ]: any[]) => {
            const id = section.data.$key;

            const defaults: ScheduleItem = {
                workouts: null,
                meals: null,
                section: section.section,
                timestamp: new Date(section.day).getTime()
            }

            const payload = {
                // if there is an id, use the data passed in, else use default
                ...(id ? section.data : defaults),
                ...items
            };

            if (id) {
                return this.updateSection(id, payload);
            } else {
                return this.createSection(payload);
            }
        });

    selected$ = this.section$
        .do((next: any) => this.store.set('selected', next));

    list$ = this.section$
        .map((value: any) => this.store.value[value.type])
        .do((next: any) => this.store.set('list', next));

    // create public property, schedule$
    schedule$: Observable<ScheduleItem[]> = this.date$
        .do((next: any) => this.store.set('date', next))
        // get the schedule between the active dates and set it in the store
        .map((day: any) => {
            const startAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime();

            const endAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
            ).getTime() - 1;

            return { startAt, endAt };
        })
        .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
        // after Firebase call: get uid
        .map((data: any) => {
            const mapped: ScheduleList = {};

            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }
            return mapped;
        })
        .do((next: any) => this.store.set('schedule', next));

    constructor(
        private store: Store,
        private authService: AuthService,
        private db: AngularFireDatabase
    ) {}

    get uid() {
        return this.authService.user.uid;
    }

    updateItems(items: string[]) {
        this.itemList$.next(items);
    }

    updateDate(date: Date) {
        this.date$.next(date);
    }

    selectSection(event: any) {
        // we take the event (the selected section) and pass it into our custom Subject
        this.section$.next(event);
    }

    // 1. updateDate is called with a date sent in
    // 2. on date$ we can call .next and send in the new date
    //   - date$ is a BehaviorSubject so we can pass in new data and it can be an observable!
    // 3. because date$ is a BehaviorSubject, it will auto call the observable
    // 4. the observable will set the new date in the store


    // FIREBASE CALLS
    private createSection(payload: ScheduleItem) {
        return this.db.list(`schedule/${this.uid}`).push(payload);
    }

    private updateSection(key: string, payload: ScheduleItem) {
        return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
    }

    private getSchedule(startAt: number, endAt: number) {
        // gets schedule list for user ordered by time between startAt and endAt dates
        return this.db.list(`schedule/${this.uid}`, {
            query: {
                orderByChild: 'timestamp',
                startAt,
                endAt
            }
        });
    }
}