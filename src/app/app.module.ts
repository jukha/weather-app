import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { KelvinToCelsiusPipe } from 'pipes/kelvin-to-celsius.pipe';
import { KelvinToFahrenheitPipe } from 'pipes/kelvin-to-fahrenheit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    KelvinToCelsiusPipe,
    KelvinToFahrenheitPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    GooglePlaceModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
