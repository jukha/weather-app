import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kelvinToFahrenheit' })
export class KelvinToFahrenheitPipe implements PipeTransform {
  transform(kelvin: number): number {
    let kTemp = kelvin;
    let kToFahr = ((kTemp - 273.15) * 9) / 5 + 32;
    return Number(Math.round(kToFahr));
  }
}
