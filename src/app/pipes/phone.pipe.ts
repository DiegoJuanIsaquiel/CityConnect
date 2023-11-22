import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
    transform(value: string) {
        if (value != null) {
            var cell = value.substring(0, 0) + '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
            return cell;
        } else {
            return value;
        }
    }
}

@NgModule({
    declarations: [
        PhonePipe
    ],
    exports: [
        PhonePipe
    ]
})
export class PhonePipeModule { }