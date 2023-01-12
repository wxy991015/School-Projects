import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { ColorComponent } from './color/color.component';
import { TimerComponent } from './timer/timer.component';
import { NameComponent } from './name/name.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ColorComponent,
    TimerComponent,
    NameComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
