import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kelvinToCelsius' })
export class KelvinToCelsiusPipe implements PipeTransform {
  transform(kelvin: number): number {
    let kTemp = kelvin;
    let kToCels = kTemp - 273.15;
    return Number(Math.round(kToCels));
  }
}
