import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ChangeDetectorRef } from '@angular/core';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  const coursesMock = [
    { id: 1, name: 'Course 1', description: 'Description 1', duration: 100, date: "2020-01-01", lector: "Lector 1" },
    { id: 2, name: 'Course 2', description: 'Description 2', duration: 200, date: "2020-01-01", lector: "Lector 2" },
  ];

  beforeEach(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
      'getCourses',
      'getCoursesAll',
      'deleteCourse',
    ]);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', [
      'activeLoader$',
    ]);
  
    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        ChangeDetectorRef,
      ],
      imports: [FormsModule, ReactiveFormsModule],
    });
  
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  
    coursesService.getCoursesAll.and.returnValue(of(coursesMock));
    coursesService.getCourses.and.returnValue(of(coursesMock)); // Add this line
    loaderServiceSpy.activeLoader$.and.returnValue(of(false));
  });
  
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getCourses method', () => {
      spyOn(component, 'getCourses');
      component.ngOnInit();
      expect(component.getCourses).toHaveBeenCalled();
    });

    it('should set coursesLength on ngOnInit', () => {
      component.ngOnInit();
      expect(component.coursesLength).toBe(coursesMock.length);
    });

    it('should filter courses based on the value in filter FormControl', (done) => {
      component.ngOnInit();
      component.filter.setValue('Course 1');

      setTimeout(() => {
        expect(component.filteredCourses.length).toBe(1);
        expect(component.filteredCourses[0].name).toBe('Course 1');
        done();
      }, 600);
    });
  });

  describe('getCourses', () => {
    it('should get courses and set them to courses and filteredCourses', () => {
      coursesService.getCourses.and.returnValue(of(coursesMock));
      component.getCourses();
      expect(coursesService.getCourses).toHaveBeenCalled();
      expect(component.courses).toEqual(coursesMock);
      expect(component.filteredCourses).toEqual(coursesMock);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course and refresh the courses list', () => {
      coursesService.deleteCourse.and.returnValue(of({}));
      coursesService.getCourses.and.returnValue(of(coursesMock));
      spyOn(component, 'getCourses');
      component.deleteCourse(1);
  
      expect(coursesService.deleteCourse).toHaveBeenCalledWith(1);
      expect(component.getCourses).toHaveBeenCalled();
    });
  });
  
    
    describe('load', () => {
    it('should load more courses and concatenate them to the existing courses list', () => {
    const newCourses = [
    { id: 3, name: 'Course 3', description: 'Description 3', duration: 300, date: "2020-01-01", lector: "Lector 3" },
    { id: 4, name: 'Course 4', description: 'Description 4', duration: 400, date: "2020-01-01", lector: "Lector 4" },
    ];
    
   
      coursesService.getCourses.and.returnValues(of(coursesMock), of(newCourses));
      component.getCourses(); 
      component.load(); 
    
      expect(component.courses.length).toBe(4);
      expect(component.filteredCourses.length).toBe(4);
      expect(component.courses).toEqual([...coursesMock, ...newCourses]);
      expect(component.filteredCourses).toEqual([...coursesMock, ...newCourses]);
    });
    
    it('should set isCoursesFill to true when all courses are loaded', () => {
      coursesService.getCourses.and.returnValues(of(coursesMock), of([]));
      component.getCourses(); 
      component.load(); 
    
      expect(component.isCoursesFill).toBe(true);
    });
    });
    
    describe('ngOnDestroy', () => {
    it('should complete the destroy$ Subject', () => {
    spyOn(component.destroy$, 'next');
    spyOn(component.destroy$, 'complete');
    
   
      component.ngOnDestroy();
    
      expect(component.destroy$.next).toHaveBeenCalledWith(true);
      expect(component.destroy$.complete).toHaveBeenCalled();
    });
    });
    });