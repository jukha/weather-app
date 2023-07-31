import { Component, OnInit } from '@angular/core';
import { GetTempDataService } from './get-temp-data.service';
import { WeatherModel } from './models/weather.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showSearchMenu = false;
  isLoading: boolean = true;

  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';
  searchCity: string = '';

  latitude!: number;
  longitude!: number;

  hasAllowed: boolean = false;

  params: any;
  tempData?: WeatherModel;

  currTempUnit = 'c';
  currTempImage: any;
  currTempName: any;

  fiveDaysWeatherOnly: any = [];

  visibility: any;
  dateInfo: any;

  constructor(
    private backendService: GetTempDataService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    if (localStorage.getItem('hasAllowed')) {
      this.getData();
    } else {
      setTimeout(() => {
        this.getCurrentCoords();
      }, 3000);
    }
    this.dateInfo = { ...this.getDateInfo() };
  }

  handleAddressChange(address: any) {
    this.isLoading = true;
    this.showSearchMenu = false;
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
    this.fiveDaysWeatherOnly = [];
    this.getData(this.userLatitude, this.userLongitude);
  }

  formatRes(str: any) {
    let res = str.toString().replace(/(,[^,]*),/g, '$1 ');
    return res;
  }

  getDateInfo(unixMilSec?: any) {
    let now;
    if (typeof unixMilSec != 'undefined') {
      now = new Date(unixMilSec * 1000);
    } else {
      now = new Date();
    }
    let day = now.getDate();
    let weekDay = now.toLocaleDateString('default', { weekday: 'short' });
    let month = now.toLocaleString('default', { month: 'short' });
    return [weekDay, day, month];
  }

  getFiveDaysTempOnly(data: any) {
    this.fiveDaysWeatherOnly.push(data?.list[0]);
    let currDay = new Date(data?.list[0]?.dt * 1000).getDay();
    for (let i = 1; i < data?.list?.length; i++) {
      if (currDay != new Date(data?.list[i]?.dt * 1000).getDay()) {
        this.fiveDaysWeatherOnly.push(data?.list[i]);
        currDay = new Date(data?.list[i]?.dt * 1000).getDay();
      }
    }
  }

  replaceString(str: string): string {
    const index = 2;
    const replacement = 'd';
    const res =
      str.substring(0, index) + replacement + str.substring(index + 1);
    return res;
  }

  getCurrTempImg(icon: any) {
    return `http://openweathermap.org/img/wn/${icon}@4x.png`;
  }
  getData(lat?: any, long?: any) {
    this.backendService
      .getData(
        Number(lat ? lat : localStorage.getItem('latitude')),
        Number(long ? long : localStorage.getItem('longitude'))
      )
      .subscribe((data) => {
        this.getFiveDaysTempOnly(data);
        this.spinner.hide();
        this.isLoading = false;
        this.tempData = data;
        let tempImg = this.replaceString(data?.list[0].weather[0]?.icon);
        this.currTempImage = this.getCurrTempImg(tempImg);
        // this.currTempName = data?.weather[0]?.main;
        this.visibility = Math.round(data.list[0]?.visibility * 0.000621371192);
      });
  }

  getCurrentCoords() {
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
