import { Component, OnInit } from '@angular/core';
import { getDateOfISOWeek, getWeekNumber } from '../../utils/date';
import {CoursesService} from '../courses.service';
import {Course} from '../course';

@Component({
  selector: 'app-week-time-table',
  templateUrl: './week-time-table.component.html',
  styleUrls: ['./week-time-table.component.scss']
})
export class WeekTimeTableComponent implements OnInit {
  weekDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
  date: Date = new Date();
  private studentCourses: Map<string, Course>;

  constructor(private courses: CoursesService) {
    const [year, week]: number[] = getWeekNumber(this.date);
    this.date = getDateOfISOWeek(week, year);
  }

  ngOnInit() {
    this.courses.getStudentCourses().subscribe((courses) => {

      return this.studentCourses = courses;
    });
  }

  asWeek(date: Date): number {
    return getWeekNumber(date)[1];
  }

}
