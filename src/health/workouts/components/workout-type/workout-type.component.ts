import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// to export the workout type
export const TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkoutTypeComponent),
    multi: true
}

@Component({
    selector: 'workout-type',
    providers: [TYPE_CONTROL_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-type.component.scss'],
    templateUrl: 'workout-type.component.html'
})
export class WorkoutTypeComponent implements ControlValueAccessor {

    selectors = ['strength', 'endurance'];

    value: string; // default value is 'strength'

    private onTouch: Function;
    private onModelChange: Function;

    registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    // writeValue is given to us by Angular when we created the form
    // and the value we get is the form type
    writeValue(value: string) {
        this.value = value;
    }

    setSelected(value: string) {
        this.value = value;
        this.onModelChange(value); // to update our form
        this.onTouch(); // must have. Not sure why. Because user interacted with form.
    }
}