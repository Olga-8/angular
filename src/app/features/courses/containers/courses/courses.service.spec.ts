// import { TestBed } from '@angular/core/testing';

// import { CoursesService } from './courses.service';

// describe('CoursesService', () => {
//   let service: CoursesService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CoursesService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { CoursesApiService } from 'src/app/core/services/courses-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { of } from 'rxjs';
import { Course } from 'src/app/features/courses/containers/courses/course.model';
import { first } from 'rxjs/operators';

describe('CoursesService', () => {
  let service: CoursesService;
  let apiServiceSpy: jasmine.SpyObj<CoursesApiService>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spyApi = jasmine.createSpyObj('CoursesApiService', [
      'getCoursesAll',
      'getCourses',
      'deleteCourse',
      'addCourse',
      'getCourseById',
      'editCourse',
      'getCoursesByName'
    ]);

    const spyLoader = jasmine.createSpyObj('LoaderService', [
      'showLoader',
      'hideLoader'
    ]);

    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        { provide: CoursesApiService, useValue: spyApi },
        { provide: LoaderService, useValue: spyLoader }
      ]
    });

    service = TestBed.inject(CoursesService);
    apiServiceSpy = TestBed.inject(CoursesApiService) as jasmine.SpyObj<
      CoursesApiService
    >;
    loaderServiceSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<
      LoaderService
    >;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCoursesAll should return a list of courses', () => {
    const mockCourses: Course[] = [
      { id: 1, name: 'Course 1', description: 'Description 1', duration: 60, date: "2021-01-01", lector: "Lector" },
      { id: 2, name: 'Course 2', description: 'Description 2', duration: 90, date: "2021-01-01", lector: "Lector" }
    ];

    apiServiceSpy.getCoursesAll.and.returnValue(of(mockCourses));

    service.getCoursesAll().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    expect(apiServiceSpy.getCoursesAll).toHaveBeenCalled();
    expect(loaderServiceSpy.showLoader).toHaveBeenCalled();
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
  });

  it('#getCourses should return a list of courses', () => {
    const start = 0;
    const limit = 4;
    const mockCourses: Course[] = [
      { id: 1, name: 'Course 1', description: 'Description 1', duration: 60, date: "2021-01-01", lector: "Lector" },
      { id: 2, name: 'Course 2', description: 'Description 2', duration: 90, date: "2021-01-01", lector: "Lector" }
    ];

    apiServiceSpy.getCourses.and.returnValue(of(mockCourses));

    service.getCourses(start, limit).subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });
    
    expect(apiServiceSpy.getCourses).toHaveBeenCalledWith(start, limit);
    expect(loaderServiceSpy.showLoader).toHaveBeenCalled();
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
    });
    
    it('#deleteCourse should return a success message', () => {
    const id = 1;
    
    
    apiServiceSpy.deleteCourse.and.returnValue(of({ message: 'success' }));
    
    service.deleteCourse(id).subscribe(response => {
      expect(response).toEqual({ message: 'success' });
    });
    
    expect(apiServiceSpy.deleteCourse).toHaveBeenCalledWith(id);
    expect(loaderServiceSpy.showLoader).toHaveBeenCalled();
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
    });
    
    it('#addCourse should return the added course', () => {
    const course: Course = {
    id: 1,
    name: 'Course 1',
    description: 'Description 1',
    duration: 60,
    date: "2021-01-01",
    lector: "Lector"
    };
    
    
    apiServiceSpy.addCourse.and.returnValue(of(course));
    
    service.addCourse(course).subscribe(addedCourse => {
      expect(addedCourse).toEqual(course);
    });
    
    expect(apiServiceSpy.addCourse).toHaveBeenCalledWith(course);
    expect(loaderServiceSpy.showLoader).toHaveBeenCalled();
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
    });
    
    it('#getCourseById should return the course with the given id', () => {
    const id = 1;
    const course: Course = {
    id: 1,
    name: 'Course 1',
    description: 'Description 1',
    duration: 60,
    date: "2021-01-01",
    lector: "Lector"
    };
    
   
    apiServiceSpy.getCourseById.and.returnValue(of(course));
    
    service.getCourseById(id).subscribe(courseById => {
      expect(courseById).toEqual(course);
      service.courseSabject$.pipe(first()).subscribe(courseValue => {
        expect(courseValue).toEqual(course);
      });
    });
    
    expect(apiServiceSpy.getCourseById).toHaveBeenCalledWith(id);
    expect(loaderServiceSpy.showLoader).toHaveBeenCalled();
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
    });
    
    it('#editCourse should return the updated course', () => {
    const course: Course = {
    id: 1,
    name: 'Course 1',
    description: 'Description 1',
    duration: 60,
    date: "2021-01-01",
    lector: "Lector"
    };
    
   
    apiServiceSpy.editCourse.and.returnValue(of(course));
    
    service.editCourse(course).subscribe(updatedCourse => {
      expect(updatedCourse).toEqual(course);
    });
    
    expect(apiServiceSpy.editCourse).toHaveBeenCalledWith(course);
    expect(loaderServiceSpy.showLoader).toHaveBeenCalled();
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
    });
    
    it('#getCoursesByName should return a list of courses with the given name', () => {
    const name = 'Course';
    const mockCourses: Course[] = [
    { id: 1, name: 'Course 1', description: 'Description 1', duration: 60, date: "2021-01-01", lector: "Lector"},
    { id: 2, name: 'Course 2', description: 'Description 2', duration: 90,  date: "2021-01-01", lector: "Lector" }
    ];
    
    
    apiServiceSpy.getCoursesByName.and.returnValue(of(mockCourses));
    
    service.getCoursesByName(name).subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });
    
    expect(apiServiceSpy.getCoursesByName).toHaveBeenCalledWith(name);
    expect(loaderServiceSpy.showLoader).toHaveBeenCalled();
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
    });
    });
