import {Component, OnInit} from '@angular/core';
import {Course} from '../course';
import {CoursesService} from '../courses.service';

class CourseFilter {
  year: string;
  section: string;
}

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  years: Set<number> = new Set();
  sections: Set<string> = new Set();
  courses: Course[];
  selection: Set<string> = new Set();
  filter: CourseFilter = {
    year: '4',
    section: 'TC'
  };

  constructor(private coursesService: CoursesService) {
  }

  getCourses(): void {
    this.courses = this.coursesService.getCourses();
    for (let i = 0; i < this.courses.length; i++) {
      this.years.add(this.courses[i].year);
      this.sections.add(this.courses[i].section);
    }
  }

  toggleSelection(course: string) {
    if (this.selection.has(course)) {
      this.selection.delete(course);
    } else {
      this.selection.add(course);
    }
    this.save();
  }

  save(): void {
    localStorage.setItem('courses', JSON.stringify(this.selection));
    localStorage.setItem('year', this.filter.year);
    localStorage.setItem('section', this.filter.section);
  }

  ngOnInit() {
    setInterval(() => {
      console.log(this.selection);
    }, 2000)
    const localCourses = localStorage.getItem('courses');
    if (localCourses !== null) {
      const selected = JSON.parse(localCourses);
      for (let i = 0; i < selected.length; i++) {
        this.selection[selected[i]] = true;
      }
    }
    this.filter.year = localStorage.getItem('year') || '3';
    this.filter.section = localStorage.getItem('section') || 'TC';
    this.getCourses();
  }

}
