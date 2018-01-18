import { Component, Input } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    styleUrls: ['schedule-calendar.component.scss'],
    templateUrl: 'schedule-calendar.component.html'
})
export class ScheduleCalendarComponent {

    @Input()
    date: Date;
    
    constructor() {}
}