import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { Course } from './course.model';
import { switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses!: Course[];
  destroy$: Subject<boolean> = new Subject();
  filteredCourses: Course[] = [];
  filter: FormControl = new FormControl<string>('');
  params = { start: 0, limit: 4 };
  coursesLength: number = 0;
  isCoursesFill = false;
  isLoading$ = this.LoaderService.isActiveLoader$$;
  courses$: Observable<Course[]>;

  constructor(
    private courseService: CoursesService,
    private changeDetectorRef: ChangeDetectorRef,
    public LoaderService: LoaderService
  ) {
    this.courses$ = this.courseService.getCoursesAll();
    // this.isLoading$ = of(true);
    // this.courseService
    //   .getCourses(this.params.start, this.params.limit)
    //   .pipe(
    //     // finalize(() => {
    //     //   this.isLoading$ = of(false);
    //     // }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe((courses: Course[]) => {
    //     this.courses = courses;
    //     this.filteredCourses = courses;
    //     this.changeDetectorRef.detectChanges();
    //   });
  }

  ngOnInit() {
    this.getCourses();

    this.courseService
      .getCoursesAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses: Course[]) => {
        this.coursesLength = courses.length;
        this.changeDetectorRef.detectChanges();
      });

    this.filter.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.filteredCourses = this.courses.filter((course) => {
          if (value) {
            return course.name.toLowerCase().includes(value.toLowerCase());
          } else {
            return true;
          }
        });
      });
  }

  getCourses(): void {
    this.courseService
      .getCourses(this.params.start, this.params.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses: Course[]) => {
        this.courses = courses;
        this.filteredCourses = courses;
        this.changeDetectorRef.detectChanges();
      });
  }

  deleteCourse(id: number): void {
    this.courseService
      .deleteCourse(id)
      .pipe(
        switchMap(() =>
          this.courseService.getCourses(this.params.start, this.params.limit)
        ),
        tap((courses: Course[]) => (this.courses = courses)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.getCourses();
      });

  }

  load(): void {
    this.params.start += this.params.limit;
    this.courseService
      .getCourses(this.params.start, this.params.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses: Course[]) => {
        this.courses = this.courses.concat(courses);
        this.filteredCourses = this.courses;

        if (this.courses.length >= this.coursesLength) {
          this.isCoursesFill = true;
        }
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
