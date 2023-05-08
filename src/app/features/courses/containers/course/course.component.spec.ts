import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CoursesService } from 'src/app/features/courses/containers/courses/courses.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Course } from 'src/app/features/courses/containers/courses/course.model';
import { Router } from '@angular/router';

import { By } from '@angular/platform-browser';


class ActivatedRouteStub {
    snapshot = {
      params: {
        id: 1 
      }
    };
  }
  
  describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;
    let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
    let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  
    beforeEach(() => {
      const spyCoursesService = jasmine.createSpyObj('CoursesService', ['addCourse', 'editCourse']);
      const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
      const spyActivatedRoute = {
        snapshot: {
          params: { id: 1 }
        },
        data: of({
          feature: {
            id: 1,
            name: 'Test Course',
            description: 'Test Description',
            duration: 120,
            date: '2023-04-10',
            lector: 'Test Lecturer'
          }
        })
      };
      const spyLoaderService = jasmine.createSpyObj('LoaderService', ['isActiveLoader$$']);

      TestBed.overrideProvider(ActivatedRoute, { useValue: spyActivatedRoute }); // переместили эту строку сюда
      
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [CourseComponent],
        providers: [
          { provide: CoursesService, useValue: spyCoursesService },
          { provide: Router, useValue: spyRouter },
          { provide: LoaderService, useValue: spyLoaderService },
        ]
      })
      .compileComponents();
    
      fixture = TestBed.createComponent(CourseComponent);
      component = fixture.componentInstance;
      coursesServiceSpy = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
      routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      loaderServiceSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    
      activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    });

    
  
    afterEach(() => {
      fixture.destroy();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should build the course form', () => {
      component.buildForm();
  
      expect(component.courseForm).toBeDefined();
      expect(component.courseForm.controls['courseName']).toBeDefined();
      expect(component.courseForm.controls['courseDescr']).toBeDefined();
      expect(component.courseForm.controls['courseDuration']).toBeDefined();
      expect(component.courseForm.controls['courseDate']).toBeDefined();
      expect(component.courseForm.controls['courseAutor']).toBeDefined();
    });

    it('should check if it is an edit form', () => {
        component.buildForm();
        activatedRouteSpy.snapshot.params['id'] = 1;
        component.checkIsEditForm();
      
        expect(component.isEditForm).toBeTruthy();
        expect(component.courseId).toEqual(1);
        expect(component.courseForm.controls['courseName'].value).toBeDefined();
        expect(component.courseForm.controls['courseDescr'].value).toBeDefined();
        expect(component.courseForm.controls['courseDuration'].value).toBeDefined();
        expect(component.courseForm.controls['courseDate'].value).toBeDefined();
        expect(component.courseForm.controls['courseAutor'].value).toBeDefined();
      });
  

})