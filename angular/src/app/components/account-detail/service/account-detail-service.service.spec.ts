import { TestBed } from '@angular/core/testing';

import { AccountDetailServiceService } from './account-detail-service.service';

describe('AccountDetailServiceService', () => {
  let service: AccountDetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountDetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
