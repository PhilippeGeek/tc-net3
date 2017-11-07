import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  id: Observable<String>;
  url: Observable<String>;

  constructor(route: ActivatedRoute) {
    console.log(route);
  }
}
