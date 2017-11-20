import { Pipe, PipeTransform } from '@angular/core';
import {Course} from '../course';

@Pipe({
  name: 'coursesFilter',
  pure: false
})
export class CoursesFilterPipe implements PipeTransform {

  transform(items: Set<Course>, filter: Object): Set<Course> {
    if (!items || !filter) {
      return items;
    }
    let objects: Course[] = [];
    for (const course of items){
      objects.push(course);
    }
    for (const property in filter) {
      if (filter.hasOwnProperty(property)) {
        objects = objects.filter(item => {
          if (filter[property] !== '') {
            if (!item.hasOwnProperty(property)) {
              return false;
            }
            return item[property].toString() === filter[property];
          } else {
            return !item.hasOwnProperty(property) || item[property] === null || item[property] === '';
          }
        });
      }
    }
    return new Set(objects);
  }

}
