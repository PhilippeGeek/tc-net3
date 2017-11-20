import {Course} from './course';

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TcNetApiService} from './tc-net-api.service';

@Injectable()
export class CoursesService {

  constructor(private api: TcNetApiService) { }

  getCourses(): Observable<Set<Course>> {
    return this.api.getCourses();
  }

  getStudentCourses(): Observable<Map<string, Course>> {
    return Observable.create((observable) => {

      this.getCourses().subscribe(
        (courses) => {
          const allCourses: Map<string, Course> = new Map();
          const studentCourses: Map<string, Course> = new Map();
          courses.forEach((c) => allCourses.set(c.id, c));

          const localCourses = localStorage.getItem('courses');
          if (localCourses !== null) {
            const selected = JSON.parse(localCourses);
            for (let i = 0; i < selected.length; i++) {
              studentCourses.set(selected[i], allCourses.get(selected[i]));
            }
          }
          observable.next(studentCourses);
          observable.complete();
        }, (err) => observable.error(err)
      );

    });
  }

}
