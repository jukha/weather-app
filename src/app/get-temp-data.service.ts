import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { environment2 } from 'src/environments/environment.developer';
import { WeatherModel } from './models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class GetTempDataService {
  private apiUrl = environment.url;
  private apiKey = environment2.API_KEY;

  constructor(private httpObj: HttpClient) {}

  getData(latitude: number, longitude: number): Observable<WeatherModel> {
    let params1 = new HttpParams()
      .set('lat', latitude)
      .set('lon', longitude)
      .set('appid', this.apiKey);
    return this.httpObj.get<WeatherModel>(this.apiUrl, { params: params1 });
  }
}
