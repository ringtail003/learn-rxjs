import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MergeMapComponent } from './components/merge-map/merge-map.component';
import { ConcatMapComponent } from './components/concat-map/concat-map.component';
import { SwitchMapComponent } from './components/switch-map/switch-map.component';
import { ForkJoinComponent } from './components/fork-join/fork-join.component';

@NgModule({
  declarations: [
    AppComponent,
    MergeMapComponent,
    ConcatMapComponent,
    SwitchMapComponent,
    ForkJoinComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
