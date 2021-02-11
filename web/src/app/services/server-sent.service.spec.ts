import { TestBed } from '@angular/core/testing';

import { ServerSentService } from './server-sent.service';

describe('ServerSentService', () => {
  let service: ServerSentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerSentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
