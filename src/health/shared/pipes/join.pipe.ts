import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    transform(value: any) {
        // if the value is an array, join with comma and space. Else return value as is.
        return Array.isArray(value) ? value.join(' | ') : value;
    }
}