import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../features/courses/containers/courses/courses.service';
import { tap } from 'rxjs/operators';
import { Course } from '../features/courses/containers/courses/course.model';

@Injectable({
  providedIn: 'root',
})
export class EditFormResolverResolver implements Resolve<Course> {
 
  constructor(private coursesService: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    return this.coursesService.getCourseById(route.params['id']) 
  }
}
