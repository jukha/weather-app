import { Component, OnInit } from '@angular/core';
import { GetTempDataService } from './get-temp-data.service';
import { WeatherModel } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  showSearchMenu = false;

  latitude!: number;
  longitude!: number;

  hasAllowed: boolean = false;

  params: any;
  tempData?: WeatherModel;

  currTempUnit = 'c';

  constructor(private backendService: GetTempDataService) {}

  ngOnInit() {
    if (localStorage.getItem('hasAllowed')) {
      this.getData();
    } else {
      setTimeout(() => {
        this.getCurrentCoords();
      }, 3000);
    }
  }

  getData() {
    this.backendService
      .getData(
        Number(localStorage.getItem('latitude')),
        Number(localStorage.getItem('longitude'))
      )
      .subscribe((data) => {
        console.log(data);
        this.tempData = data;
      });
  }

  getCurrentCoords() {
    console.log('hi');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.hasAllowed = true;
          localStorage.setItem('hasAllowed', this.hasAllowed.toString());
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          localStorage.setItem('latitude', this.latitude.toString());
          localStorage.setItem('longitude', this.longitude.toString());
        },
        (error) => console.log(error)
      );
    }
  }

  // celsToFahren(celcius) {
  //   let cTemp = celcius;
  //   let cToFhr = (cTemp * 9) / 5 + 32;
  //   return cToFhr;
  // }
  kelvinToFahren(kelvin:number):number {
    let kTemp = kelvin;
    let kToFahr = (kTemp - 273.15) * 9/5 + 32;
    return Number(Math.round(kToFahr));
  }
  kelvinToCels(kelvin:number):number{
    let kTemp = kelvin;
    let kToCels = kTemp - 273.15;
    return Number(Math.round(kToCels));
  }
}
