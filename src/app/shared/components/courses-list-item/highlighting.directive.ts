import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';
import { Course } from 'src/app/features/courses/containers/courses/course.model';

@Directive({
  selector: '[appHighlighting]',
})
export class HighlightingDirective implements OnInit {
  @Input() course!: Course;

  @Input('appHighlighting') date!: string;

  constructor(private element: ElementRef, private render2: Renderer2) {}

  ngOnInit() {
    const { nativeElement } = this.element;
    const date = new Date(this.date);
    const currentDate = new Date();
    const timeDifferenceInDays = Math.floor(
      (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (timeDifferenceInDays < 14) {
      this.render2.setStyle(
        nativeElement,
        'border',
        '3px solid #4caf50'
      );
    }
  }
}
