import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "activeHour",
    standalone: true
})
export class NgxMatTimepickerActiveHourPipe implements PipeTransform {

    transform(hour: number, currentHour: number, isClockFaceDisabled: boolean): boolean {
        if (hour == null || isClockFaceDisabled) {
            return false;
        }

        return hour === currentHour;
    }

}
