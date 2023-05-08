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
import { map, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  loader$!: Observable<boolean>;
  id!: number;
  course$!: Observable<Course>;
  courses!: Course;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    public LoaderService: LoaderService
  ) {
    this.loader$ = this.LoaderService.isActiveLoader$$;
  }

  ngOnInit() {
    this.id = this.ActivatedRoute.snapshot.params['id'];
   

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
        .pipe(
          tap(() => this.router.navigate(['/courses'])),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      this.courseService
        .addCourse(course)
        .pipe(
          tap(() => this.router.navigate(['/courses'])),
          takeUntil(this.destroy$)
        )
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
      // console.log(this.ActivatedRoute.snapshot.params['id']);
      this.isEditForm = true;
      this.courseId = this.ActivatedRoute.snapshot.params['id'];
      this.ActivatedRoute.data.subscribe((data) => {
        console.log(data['feature']);
        this.courseForm.setValue({
          courseName: data['feature'].name,
          courseDescr: data['feature'].description,
          courseDuration: data['feature'].duration,
          // courseDate: data['date'],
          courseDate: this.dataTransformToMMDDYY(data['feature'].date),
          courseAutor: data['feature'].lector,
        });
      });
    }
  }

  dataTransformToMMDDYY(date: string): string {
    console.log(date);
    const [year, month, day] = date.split('-');
    const yy = year.slice(2);
    return `${month}/${day}/${yy}`;
  }
}
