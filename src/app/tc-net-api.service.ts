import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from './course';

@Injectable()
export class TcNetApiService {
  private static API_HOST: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  apiUrl(endpoint: string): string {
    return TcNetApiService.API_HOST + '/api' + endpoint;
  }

  getCourses(): Observable<Set<Course>>{
    return Observable.create((obs) => {
      this.http.get(this.apiUrl('/courses')).subscribe(
        (data) => {
          obs.next(new Set(<Course[]>data));
          obs.complete();
        },
        (err) => obs.error(err)
      );
    });
  }



}
