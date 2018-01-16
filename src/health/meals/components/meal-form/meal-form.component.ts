import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html'
})

export class MealFormComponent implements OnChanges {

    toggled = false;
    exists = false;

    @Input()
    meal: Meal;

    @Output()
    create = new EventEmitter<Meal>();

    @Output()
    update = new EventEmitter<Meal>();

    @Output()
    remove = new EventEmitter<Meal>();

    form = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array([''])
    });

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.meal && this.meal.name) {
            this.exists = true;
            this.emptyIngredients();

            const value = this.meal;
            this.form.patchValue(value);
            //currently patchValue will not auto update form arrays
            // so we have to manually empty and repopulate to ensure correct data
            // benefit of doing this inside the ngOnChanges is if DB updates, this will be called and UI will update!
            if (value.ingredients) {
                for (const item of value.ingredients) {
                    this.ingredients.push(new FormControl(item));
                }
            }
        }
    }

    emptyIngredients() {
        while(this.ingredients.controls.length) {
            this.ingredients.removeAt(0);
        }
    }

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    // this is linked to the 'ingredients' in the view (in the label / ngFor)
    get ingredients() {
        return this.form.get('ingredients') as FormArray;
    }

    createMeal() { // this is a callback
        if(this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    updateMeal() {
        if(this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    removeMeal() {
        this.remove.emit(this.form.value);
    }

    addIngredient() {
        this.ingredients.push(new FormControl(''));
    }

    removeIngredients(index: number) {
        this.ingredients.removeAt(index);
    }

    toggle() {
        this.toggled = !this.toggled;
    }
}