import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from './course';
import {FaceToFace} from './face-to-face';
import {environment} from '../environments/environment';

@Injectable()
export class TcNetApiService {
  private static API_HOST: string = environment.api;

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


  getFaceToFace(courses: Set<Course>): Observable<Set<FaceToFace>> {
    let req = this.apiUrl('/courses/');
    for (const c of courses) {
      req += c.id + ',';
    }
    req = req.substring(0, req.length - 1);
    const f2f: Set<FaceToFace> = new Set();
    return Observable.create((obs) => {
      this.http.get(req).subscribe(
        (data: any[]) => {
          for (let i = 0; i < data.length; i++) {
            const faceToFace = FaceToFace.fromApi(data[i]);
            f2f.add(faceToFace);
          }
          obs.next(f2f);
          obs.complete();
        },
        (err) => obs.error(err)
      );
    });
  }
}
