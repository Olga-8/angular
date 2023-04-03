import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseComponent } from './containers/course/course.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [  
    CoursesComponent,
    CourseComponent,
  ]
})
export class CoursesModule { }
