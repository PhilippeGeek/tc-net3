import {Course} from './course';
import COURSES from './mock-courses';

import { Injectable } from '@angular/core';

@Injectable()
export class CoursesService {

  constructor() { }

  getCourses(): Course[] {
    return <Course[]>COURSES;
  }

}
