import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {WeekTimeTableComponent} from './week-time-table/week-time-table.component';
import {SetupComponent} from './setup/setup.component';
import {CoursesService} from './courses.service';
import {FormsModule} from '@angular/forms';
import { CoursesFilterPipe } from './setup/courses-filter.pipe';
import {HttpClientModule} from "@angular/common/http";
import {TcNetApiService} from "./tc-net-api.service";

const appRoutes: Routes = [
  {path: 'week', component: WeekTimeTableComponent},
  {path: 'setup', component: SetupComponent},
  {path: '', redirectTo: 'week', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    WeekTimeTableComponent,
    SetupComponent,
    CoursesFilterPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    CoursesService,
    TcNetApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
