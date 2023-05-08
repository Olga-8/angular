import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Course } from '../../../features/courses/containers/courses/course.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListItemComponent {
  @Input()
  course!: Course;

  @Output()
  deleteCourse: EventEmitter<number> = new EventEmitter<number>();

  delete(): void {
    this.deleteCourse.emit(this.course.id);
  }
}
