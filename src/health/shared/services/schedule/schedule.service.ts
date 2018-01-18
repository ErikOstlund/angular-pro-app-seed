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
}