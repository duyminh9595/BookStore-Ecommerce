import { TestBed } from '@angular/core/testing';

import { AccountCartService } from './account-cart.service';

describe('AccountCartService', () => {
  let service: AccountCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
