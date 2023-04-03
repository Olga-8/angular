import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseComponent } from './containers/course/course.component';


const routes: Routes = [
    {
    path: '',
    component: CoursesComponent
    },
    {
    path: 'add',
    component: CourseComponent,
    data: { title: 'Add new course' }
    },
    {
    path: ':id',
    component: CourseComponent,
    data: { title: 'Edit course' }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
