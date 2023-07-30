import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
})
export class TemperatureComponent implements OnInit, OnChanges {
  @Input() temp!: number;
  @Input() currTempUnit = 'c';
  @Input() isLoading = false;

  fahrenheitTemp = 0;
  celsiusTemp = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['temp']) {
      this.fahrenheitTemp = this.kelvinToFahren(this.temp);
      this.celsiusTemp = this.kelvinToCels(this.temp);
    }
  }

  kelvinToFahren(kelvin: number): number {
    console.log('KTF');
    let kTemp = kelvin;
    let kToFahr = ((kTemp - 273.15) * 9) / 5 + 32;
    return Number(Math.round(kToFahr));
  }
  kelvinToCels(kelvin: number): number {
    console.log('KTC');
    let kTemp = kelvin;
    let kToCels = kTemp - 273.15;
    return Number(Math.round(kToCels));
  }
}
