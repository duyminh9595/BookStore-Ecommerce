import { TestBed } from '@angular/core/testing';

import { AcceptTokenService } from './accept-token.service';

describe('AcceptTokenService', () => {
  let service: AcceptTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
