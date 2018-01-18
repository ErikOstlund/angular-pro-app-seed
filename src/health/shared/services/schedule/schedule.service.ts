import { Injectable } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ScheduleService {

    private date$ = new BehaviorSubject(new Date());

    // create public property, schedule$
    schedule$: Observable<any[]> = this.date$
        .do((next: any) => this.store.set('date', next));

    constructor(
        private store: Store
    ) {}

    updateDate(date: Date) {
        this.date$.next(date);
    }

    // 1. updateDate is called with a date sent in
    // 2. on date$ we can call .next and send in the new date
    //   - date$ is a BehaviorSubject so we can pass in new data and it can be an observable!
    // 3. because date$ is a BehaviorSubject, it will auto call the observable
    // 4. the observable will set the new date in the store
}