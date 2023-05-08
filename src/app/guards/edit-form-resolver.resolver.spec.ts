import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EditFormResolverResolver } from './edit-form-resolver.resolver';
import { CoursesService } from '../features/courses/containers/courses/courses.service';
import { Course } from '../features/courses/containers/courses/course.model';

describe('EditFormResolverResolver', () => {
  let resolver: EditFormResolverResolver;
  let coursesService: jasmine.SpyObj<CoursesService>;

  beforeEach(() => {
    const spyCoursesService = jasmine.createSpyObj('CoursesService', [
      'getCourseById',
    ]);

    TestBed.configureTestingModule({
      providers: [
        EditFormResolverResolver,
        { provide: CoursesService, useValue: spyCoursesService },
      ],
    });
    resolver = TestBed.inject(EditFormResolverResolver);
    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve course', () => {
    const course: Course = { id: 1, name: 'Course 1', date: '2020-01-01', duration: 100, description: 'Description 1', lector: 'Lector 1' };
    coursesService.getCourseById.and.returnValue(of(course));

    const activatedRouteSnapshot = { params: { id: 1 } } as any;
    const result = resolver.resolve(activatedRouteSnapshot);

    expect(result).toBeDefined();
    result.subscribe((data) => {
      expect(data).toEqual(course);
    });
    expect(coursesService.getCourseById).toHaveBeenCalledWith(1);
  });
});
