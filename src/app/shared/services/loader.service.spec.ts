// import { TestBed } from '@angular/core/testing';

// import { LoaderService } from './loader.service';

// describe('LoaderService', () => {
//   let service: LoaderService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(LoaderService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    loaderService = new LoaderService();
  });

  it('should create', () => {
    expect(loaderService).toBeTruthy();
  });

  it('should show loader', () => {
    loaderService.showLoader();
    loaderService.isActiveLoader$$.subscribe(isActive => {
      expect(isActive).toBe(true);
    });
  });

  it('should hide loader', () => {
    loaderService.hideLoader();
    loaderService.isActiveLoader$$.subscribe(isActive => {
      expect(isActive).toBe(false);
    });
  });
});
