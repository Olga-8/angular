import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { DurationPipe } from './components/courses-list-item/duration.pipe';
import { HighlightingDirective } from './components/courses-list-item/highlighting.directive';



@NgModule({
  declarations: [
    CoursesListItemComponent,
    LoaderComponent,
    DurationPipe,
    HighlightingDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CoursesListItemComponent,
    LoaderComponent,
    DurationPipe,
    HighlightingDirective,
  ]
})
export class SharedModule { }
