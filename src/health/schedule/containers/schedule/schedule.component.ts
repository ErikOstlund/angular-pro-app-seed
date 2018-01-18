import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ScheduleService } from '../../../shared/services/schedule/schedule.service';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

    date$: Observable<Date>;
    subscriptions: Subscription[] = [];  // going to have mulitple subcriptions

    constructor(
        private store: Store,
        private scheduleService: ScheduleService
    ) {}

    ngOnInit() {
        this.date$ = this.store.select('date');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe()
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}