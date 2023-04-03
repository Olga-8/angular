import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isActiveLoader$: Subject<boolean> = new Subject<boolean>();
  isActiveLoader$$: Observable<boolean> = this.isActiveLoader$.asObservable();

  showLoader(): void {
    this.isActiveLoader$.next(true);
    console.log('true');
  }

  hideLoader(): void {
    this.isActiveLoader$.next(false);
    console.log('false');
  }

}
