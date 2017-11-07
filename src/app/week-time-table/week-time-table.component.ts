import { Component, OnInit } from '@angular/core';
import { getDateOfISOWeek, getWeekNumber } from '../../utils/date';

@Component({
  selector: 'app-week-time-table',
  templateUrl: './week-time-table.component.html',
  styleUrls: ['./week-time-table.component.scss']
})
export class WeekTimeTableComponent implements OnInit {
  weekDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
  date: Date = new Date();

  constructor() {
    const [year, week]: number[2] = getWeekNumber(this.date);
    this.date = getDateOfISOWeek(week, year);
  }

  ngOnInit() {
  }
  asWeek(date: Date): number {
    return getWeekNumber(date)[1];
  }

}
