import { TestBed } from '@angular/core/testing';

import { CoursesApiService } from './courses-api.service';

describe('CoursesApiService', () => {
  let service: CoursesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
