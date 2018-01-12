import { Component, Input } from '@angular/core';

@Component({
    selector: 'list-item',
    styleUrls: ['list-item.component.scss'],
    templateUrl: 'list-item.component.html'
})
export class ListItemComponent {

    @Input()
    item: any; // because we will use in meals and workouts

    constructor() {}
}