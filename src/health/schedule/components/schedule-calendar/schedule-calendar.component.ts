import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    styleUrls: ['schedule-calendar.component.scss'],
    templateUrl: 'schedule-calendar.component.html'
})
export class ScheduleCalendarComponent {

    selectedDay: Date;

    @Input()
    set date(date: Date) {  // set the date of type Date
        this.selectedDay = new Date(date.getTime());
    }

    @Output()
    change = new EventEmitter<Date>();

    constructor() {}

    onChange(weekOffset: number) {
        // calculate start date of next week or previous week
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + (weekOffset * 7));
        this.change.emit(startDate);
    }

    private getStartOfWeek(date: Date) {  // calculates the start of a week
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }
}