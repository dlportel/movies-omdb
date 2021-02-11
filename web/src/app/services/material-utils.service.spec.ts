import {TestBed} from '@angular/core/testing';

import {MaterialUtilsService} from './material-utils.service';

describe('MaterialUtilsService', () => {
  let service: MaterialUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
