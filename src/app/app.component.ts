import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  title = 'app-angular';
  loader : boolean = false;
  constructor(
    public LoaderService: LoaderService,
    private cdr: ChangeDetectorRef,
   
  ) {}

  ngOnInit() {
    // this.LoaderService.isActiveLoader$$
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((loader) => {
    //     this.loader = loader;
    //     this.cdr.detectChanges();
    //   });

  }
  ngAfterContentChecked(): void {
    this.LoaderService.isActiveLoader$$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loader) => {
        this.loader = loader;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
