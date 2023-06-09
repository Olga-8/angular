import { Injectable } from '@angular/core';
import { CoursesApiService } from 'src/app/core/services/courses-api.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/features/courses/containers/courses/course.model';
import { tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Subject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courseSabject$: Subject<Course> = new Subject<Course>();
    static getCourses: any;

  constructor(
    private CoursesApiService: CoursesApiService,
    private LoaderService: LoaderService
  ) {}

  getCoursesAll(): Observable<Course[]> {
    this.LoaderService.showLoader();
    return this.CoursesApiService.getCoursesAll().pipe(
      tap(() => this.LoaderService.hideLoader())
    );
  }

  getCourses(start: number, limit: number): Observable<Course[]> {
    this.LoaderService.showLoader();
    return this.CoursesApiService.getCourses(start, limit).pipe(
      tap(() => this.LoaderService.hideLoader())
    );
  }

  deleteCourse(id: number): Observable<object> {
    this.LoaderService.showLoader();
    return this.CoursesApiService.deleteCourse(id).pipe(
      tap(() => this.LoaderService.hideLoader())
    );
  }

  addCourse(course: Course): Observable<Course> {
    this.LoaderService.showLoader();
    return this.CoursesApiService.addCourse(course).pipe(
      tap(() => this.LoaderService.hideLoader())
    );
  }

  getCourseById(id: number): Observable<Course> {
    this.LoaderService.showLoader();
    return this.CoursesApiService.getCourseById(id).pipe(
      tap((course) => {
        this.LoaderService.hideLoader();
        this.courseSabject$.next(course);
      })
    );
  }

  editCourse(course: Course): Observable<Course> {
    this.LoaderService.showLoader();
    return this.CoursesApiService.editCourse(course).pipe(
      tap(() => this.LoaderService.hideLoader())
    );
  }

  getCoursesByName(name: string): Observable<Course[]> {
    this.LoaderService.showLoader();

    return this.CoursesApiService.getCoursesByName(name).pipe(
      tap(() => this.LoaderService.hideLoader())
    );
  }
}
