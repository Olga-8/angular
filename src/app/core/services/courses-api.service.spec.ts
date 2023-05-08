import { TestBed } from '@angular/core/testing';
import { CoursesApiService } from './courses-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../../features/courses/containers/courses/course.model';
import { of } from 'rxjs';



describe('CoursesApiService', () => {
  let service: CoursesApiService;
  let httpTestingController: HttpTestingController;
  const BASE_API = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesApiService],
    });

    service = TestBed.inject(CoursesApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCoursesAll', () => {
    it('should return all courses', () => {
      const expectedCourses: Course[] = [
        // Add your expected courses here
       
            {
              "name": "JavaScript",
              "description": "Have a good day!!!",
              "duration": 105,
              "date": "2000-03-27",
              "lector": "Morozova",
              "id": 1
            },
            {
              "id": 2,
              "name": "C#",
              "lector": "Shevchenko",
              "duration": 120,
              "date": "2023-03-15",
              "extraComment": false,
              "comment": "Good course",
              "description": "learn Angular"
            },
            {
              "id": 3,
              "name": "C++",
              "lector": "Kasparov",
              "duration": 20,
              "date": "2021-08-01",
              "extraComment": false,
              "comment": "Good course",
              "description": "learn JavaScript"
            }
      ];

      service.getCoursesAll().subscribe((courses) => {
        expect(courses).toEqual(expectedCourses);
      });

      const req = httpTestingController.expectOne(`${BASE_API}/courses`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCourses);
    });
  });

  describe('#getCourses', () => {
    it('should return courses with pagination', (done) => {
      const expectedCourses: Course[] = [
        {
          "name": "JavaScript",
          "description": "Have a good day!!!",
          "duration": 105,
          "date": "2000-03-27",
          "lector": "Morozova",
          "id": 1
        },
        {
          "id": 2,
          "name": "C#",
          "lector": "Shevchenko",
          "duration": 120,
          "date": "2023-03-15",
          "extraComment": false,
          "comment": "Good course",
          "description": "learn Angular"
        },
        {
          "id": 3,
          "name": "C++",
          "lector": "Kasparov",
          "duration": 20,
          "date": "2021-08-01",
          "extraComment": false,
          "comment": "Good course",
          "description": "learn JavaScript"
        }
      ];

      const start = 0;
      const limit = 4;

      service.getCourses(start, limit).subscribe((courses) => {
        expect(courses).toEqual(expectedCourses);
        done();
      });

      const req = httpTestingController.expectOne(
        (request) => request.url === `${BASE_API}/courses`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('_start')).toBe(start.toString());
      expect(req.request.params.get('_limit')).toBe(limit.toString());
      req.flush(expectedCourses);
    });
  });

  describe('#deleteCourse', () => {
    it('should delete the course with the given id', (done) => {
      const courseId = 1;
  
      service.deleteCourse(courseId).subscribe((response) => {
        expect(response).toBeTruthy();
        done();
      });
  
      const req = httpTestingController.expectOne(`${BASE_API}/courses/${courseId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true });
    });
  });
  
  describe('#addCourse', () => {
    it('should add a new course and return the added course', (done) => {
      const newCourse: Course = {
        id: 4,
        name: 'Course 4',
        description: 'Course 4 description',
        duration: 150,
        date: "2023-03-15",
        lector: "Kasparov"
      };
  
      service.addCourse(newCourse).subscribe((course) => {
        expect(course).toEqual(newCourse);
        done();
      });
  
      const req = httpTestingController.expectOne(`${BASE_API}/courses`);
      expect(req.request.method).toBe('POST');
      req.flush(newCourse);
    });
  });
  
  describe('#getCourseById', () => {
    it('should return the course with the given id', (done) => {
      const courseId = 1;
      const expectedCourse: Course = {
        id: 1,
        name: 'Course 1',
        description: 'Course 1 description',
        duration: 120,
        date: "2023-03-15",
        lector: "Kasparov"
      };
  
      service.getCourseById(courseId).subscribe((course) => {
        expect(course).toEqual(expectedCourse);
        done();
      });
  
      const req = httpTestingController.expectOne(`${BASE_API}/courses/${courseId}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCourse);
    });
  });
  
  describe('#editCourse', () => {
    it('should edit the course and return the updated course', (done) => {
      const updatedCourse: Course = {
        id: 1,
        name: 'Updated Course 1',
        description: 'Updated Course 1 description',
        duration: 120,
        date: "2023-03-15",
        lector: "Kasparov"
      };
  
      service.editCourse(updatedCourse).subscribe((course) => {
        expect(course).toEqual(updatedCourse);
        done();
      });
  
      const req = httpTestingController.expectOne(`${BASE_API}/courses/${updatedCourse.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedCourse);
    });
  });


  describe('#getCoursesByName', () => {
    it('should return courses with the given name', (done) => {
      const courseName = 'Course 1';
      const expectedCourses: Course[] = [
        {
          id: 1,
          name: 'Course 1',
          description: 'Course 1 description',
          duration: 120,
          date: "2023-03-15",
          lector: "Kasparov"
        },
      ];
  
      service.getCoursesByName(courseName).subscribe((courses) => {
        expect(courses).toEqual(expectedCourses);
      done();
    });

    const req = httpTestingController.expectOne(
      `${BASE_API}/courses?name_like=${courseName}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(expectedCourses);
  });

});
  
})

