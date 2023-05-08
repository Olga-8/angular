import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { Course } from '../../features/courses/containers/courses/course.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesApiService {
  BASE_API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getCoursesAll(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${this.BASE_API}/courses`)
      
  }

  getCourses(start: number, limit: number): Observable<Course[]> {
    let params: HttpParams = new HttpParams();

    
    params = params.append('_start', start);
    params = params.append('_limit', limit);
    
    return this.httpClient.get<Course[]>(`${this.BASE_API}/courses`, { params })
    .pipe(delay(1000));
  }
  


  // getCourses(): Observable<Course[]> {
  //   return this.httpClient
  //     .get<Course[]>(`${this.BASE_API}/courses`)
  //     .pipe(delay(1000));
  // }

  deleteCourse(id: number): Observable<object> {
    return this.httpClient
      .delete<object>(`${this.BASE_API}/courses/${id}`)
      .pipe(delay(1000));
  }

  addCourse(course: Course): Observable<Course> {
    return this.httpClient
      .post<Course>(`${this.BASE_API}/courses`, course)
      .pipe(delay(1000));
  }

  getCourseById(id: number): Observable<Course> {
    return this.httpClient
      .get<Course>(`${this.BASE_API}/courses/${id}`)
      .pipe(delay(1000));
  }

  editCourse(course: Course): Observable<Course> {
    return this.httpClient
      .put<Course>(`${this.BASE_API}/courses/${course.id}`, course)
      .pipe(delay(1000));
  }

  getCoursesByName(name: string): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${this.BASE_API}/courses?name_like=${name}`)
      .pipe(delay(1000));
  }
}
