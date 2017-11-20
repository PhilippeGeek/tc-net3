import {Course} from './course';
import moment from 'moment-timezone';

export class FaceToFace {
  static COURSES: Map<string, Course> = new Map();
  name: string;
  course: Course;
  group: string;
  location: string;
  description: string;
  theme: string;
  ens: string[] = [];
  type: string;
  start: Date;
  end: Date;

  public static fromApi(f2f: any) {
    const o = new FaceToFace();
    o.name = f2f.name;
    if (f2f.course) {
      o.course = FaceToFace.COURSES.get(f2f.course.id) || new Course();
      o.course.name = f2f.course.name;
      o.course.year = f2f.course.year;
      o.course.section = f2f.course.section;
      o.course.id = f2f.course.id;
      FaceToFace.COURSES.set(o.course.id, o.course);
    }
    o.group = f2f.group;
    o.location = f2f.location;
    o.description = f2f.description;
    o.theme = f2f.theme;
    o.type = f2f.type;
    o.start = this.parseDate(f2f.start);
    o.end = this.parseDate(f2f.end);
    o.ens = f2f.ens;
    return o;
  }

  static parseDate(date: string) {
    const regex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2})h([0-9]{2})$/gm;
    const p = regex.exec(date);
    return moment.tz(p[3] + '-' + p[2] + '-' + p[1] + ' ' + p[4] + ':' + p[5], 'Europe/Paris').toDate();
  }
}
