import {Component, OnInit} from '@angular/core';
import {Course} from '../course';
import {CoursesService} from '../courses.service';
import {CoursesFilterPipe} from "./courses-filter.pipe";

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
  courses: Set<Course>;
  selection: Map<string, boolean> = new Map();
  filter: CourseFilter = {
    year: '4',
    section: 'TC'
  };
  private courseFilter: CoursesFilterPipe = new CoursesFilterPipe();

  constructor(
    private coursesService: CoursesService,
    ) {
  }

  getCourses(): void {
    this.coursesService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
        for (const c of courses) {
          this.years.add(c.year);
          this.sections.add(c.section);
        }
      },
      (err) => this.getCourses()
    );
  }

  hasSelect(course: Course) {
    if (this.selection.has(course.id)) {
      return 'true';
    } else {
      return;
    }
  }

  invertState(course: Course) {
    if (this.selection.has(course.id)) {
      this.selection.delete(course.id);
    } else {
      this.selection.set(course.id, true);
    }
    this.save();
  }

  save(): void {
    const courses = [];
    this.selection.forEach((value, course) => {
      if (value) {
        courses.push(course);
      }
    });
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('year', this.filter.year);
    localStorage.setItem('section', this.filter.section);
  }

  selectAll() {
    const allCourses = new Set(this.courseFilter.transform(this.courses, this.filter));
    let allSelected = true;
    allCourses.forEach((course) => allSelected = allSelected && this.selection.has(course.id));
    if (allSelected) {
      allCourses.forEach((c) => this.selection.delete(c.id));
    } else {
      allCourses.forEach((c) => {
        if (!this.selection.has(c.id)) {
          this.selection.set(c.id, true);
        }
      });
    }
    this.save();
  }

  ngOnInit() {
    const localCourses = localStorage.getItem('courses');
    if (localCourses !== null) {
      const selected = JSON.parse(localCourses);
      for (let i = 0; i < selected.length; i++) {
        this.selection.set(selected[i], true);
      }
    }
    this.filter.year = localStorage.getItem('year') || '3';
    this.filter.section = localStorage.getItem('section') || 'TC';
    this.getCourses();
  }

}
