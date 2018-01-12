import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html',
})

export class MealFormComponent {

    @Output()
    create = new EventEmitter<Meal>();

    form = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array([''])
    });

    constructor(
        private fb: FormBuilder
    ) {}

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

    addIngredient() {
        this.ingredients.push(new FormControl(''));
    }

    removeIngredients(index: number) {
        this.ingredients.removeAt(index);
    }
}