import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'list-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['list-item.component.scss'],
    templateUrl: 'list-item.component.html'
})
export class ListItemComponent {

    toggled = false;

    @Input()
    item: any; // any: because we will use in meals and workouts

    @Output()
    remove = new EventEmitter<any>();

    constructor() {}

    toggle() {
        this.toggled = !this.toggled;
    }

    removeItem() {
        this.remove.emit(this.item);
    }

    getRoute(item: any) {
        return [`../meals`, item.$key];
    }
}