import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { WeekTimeTableComponent } from './week-time-table/week-time-table.component';
import { SetupComponent } from './setup/setup.component';

const appRoutes: Routes = [
  {path: 'week', component: WeekTimeTableComponent},
  {path: 'setup', component: SetupComponent},
  {path: '', redirectTo: 'week', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    WeekTimeTableComponent,
    SetupComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
