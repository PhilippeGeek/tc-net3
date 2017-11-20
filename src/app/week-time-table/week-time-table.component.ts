import {Component, OnInit} from '@angular/core';
import {getDateOfISOWeek, getWeekNumber} from '../../utils/date';
import {CoursesService} from '../courses.service';
import {Course} from '../course';
import {TcNetApiService} from "../tc-net-api.service";
import {FaceToFace} from "../face-to-face";

@Component({
  selector: 'app-week-time-table',
  templateUrl: './week-time-table.component.html',
  styleUrls: ['./week-time-table.component.scss']
})
export class WeekTimeTableComponent implements OnInit {

  weekDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
  date: Date = new Date();
  private studentCourses: Map<string, Course>;
  faceToFace: Set<FaceToFace>;
  ready = false;

  static within(subject: Date, start: Date, end: Date) {
    return subject && subject.getTime() >= start.getTime() && subject.getTime() < end.getTime();
  }

  constructor(private courses: CoursesService,
              private api: TcNetApiService) {
    const [year, week]: number[] = getWeekNumber(this.date);
    this.date = getDateOfISOWeek(week, year);
  }

  heightForFacing(facing: FaceToFace) {
    return (facing.end.getTime() - facing.start.getTime()) / (60 * 60 * 1000) * 4 + 'em';
  }

  ngOnInit() {
    this.restore();
    this.courses.getStudentCourses().subscribe((courses) => {
      this.studentCourses = courses;
      this.api.getFaceToFace(new Set(this.studentCourses.values())).subscribe((f2f) => {
        this.faceToFace = f2f;
        this.ready = true;
        this.save();
      });
    });
  }

  private restore() {
    const localCourses = localStorage.getItem('student-courses');
    const localFaceToFace = localStorage.getItem('student-face2face');
    if (localCourses && localFaceToFace) {
      this.studentCourses = new Map(JSON.parse(localCourses));
      this.faceToFace = new Set(JSON.parse(localFaceToFace));
      for (const f of this.faceToFace){
        f.start = new Date(f.start);
        f.end = new Date(f.end);
      }
      this.ready = true;
    }
    const date = localStorage.getItem('date');
    if (date) {
      this.date = new Date(date);
    }
  }

  private save() {
    localStorage.setItem('student-courses', JSON.stringify([...this.studentCourses]));
    localStorage.setItem('student-face2face', JSON.stringify([...this.faceToFace]));
  }

  hoursOfDay(weekDay: Date) {
    const hours = [];
    for (let i = 8; i < 20; i++) {
      hours.push(new Date(weekDay.getTime() + i * 60 * 60 * 1000));
    }
    return hours;
  }

  days() {
    return [0, 1, 2, 3, 4].map((i) => new Date(this.date.getTime() + i * 24 * 60 * 60 * 1000));
  }

  displayAt(time: Date): FaceToFace[] {
    const facings = [];
    this.faceToFace.forEach((facing) => {
      if (WeekTimeTableComponent.within(facing.start, time, new Date(time.getTime() + 60 * 60 * 1000))) {
        facings.push(facing);
      }
    });
    return facings;
  }

  asWeek(date: Date): number {
    return getWeekNumber(date)[1];
  }

  cssClassFor(facing: FaceToFace) {
    const clazz = ['course'];
    switch (facing.type) {
      case '2':
        clazz.push('type-td');

        break;
      case '3':
        clazz.push('type-tp');

        break;
      case '4':
        clazz.push('type-tp');

        break;
      case '1':
      case '0':
      default:
        clazz.push('type-course');
        break;
    }
    return clazz;
  }

  prevWeek() {
    this.date = new Date(this.date.getTime() - 7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('date', this.date.toDateString());
  }

  nextWeek() {
    this.date = new Date(this.date.getTime() + 7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('date', this.date.toDateString());
  }
}
