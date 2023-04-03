import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom.validators';
import { Course } from 'src/app/features/courses/containers/courses/course.model';
import { CoursesService } from 'src/app/features/courses/containers/courses/courses.service';
import { takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  courseId!: number;
  isEditForm: boolean = false;
  autors: string[] = [
    'Morozova',
    'Schevchenko',
    'Bach',
    'Skovoroda',
    'Petrenko',
    'Kovalenko',
  ];
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.buildForm();
    this.checkIsEditForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.maxLength(50)]],
      courseDescr: ['', [Validators.required, Validators.maxLength(50)]],
      courseDuration: [
        '',
        {
          validators: [
            Validators.required,
            CustomValidators.courseDurationValidator(1, 600),
          ],
          updateOn: 'blur',
        },
      ],
      courseDate: [
        '',
        [Validators.required, CustomValidators.courseDateValidator],
      ],
      courseAutor: ['', Validators.required],
    });
  }

  onSave(): void {
    const course: Course = {
      name: this.courseForm.value.courseName,
      description: this.courseForm.value.courseDescr,
      duration: this.courseForm.value.courseDuration,
      date: this.dataTransformToISO(this.courseForm.value.courseDate),
      lector: this.courseForm.value.courseAutor,
    };

    if (this.isEditForm) {
      this.courseService
        .editCourse({ ...course, id: this.courseId })
        .pipe(tap(() => this.router.navigate(['/courses'])),
        takeUntil(this.destroy$))
        .subscribe()
    } else {
      this.courseService
        .addCourse(course)
        .pipe(tap(() => this.router.navigate(['/courses'])),
        takeUntil(this.destroy$))
        .subscribe();
    }
  }

  dataTransformToISO(date: string): string {
    const [mm, dd, yy] = date.split('/');
    const year = `20${yy}`;
    const isoDate = new Date(`${year}-${mm}-${dd}`).toISOString().slice(0, 10);
    return isoDate;
  }

  checkIsEditForm(): void {
    if (this.ActivatedRoute.snapshot.params['id']) {
      this.isEditForm = true;
      this.courseId = this.ActivatedRoute.snapshot.params['id'];
      this.courseService
        .getCourseById(this.courseId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((course: Course) => {
          this.courseForm.setValue({
            courseName: course.name,
            courseDescr: course.description,
            courseDuration: course.duration,
            // courseDate: course.date,
            courseDate: this.dataTransformToMMDDYY(course.date),
            courseAutor: course.lector,
          });
        });
    }
  }

  dataTransformToMMDDYY(date: string): string {
    const [year, month, day] = date.split('-');
    const yy = year.slice(2);
    return `${month}/${day}/${yy}`;
  }


}
