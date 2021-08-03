import { TestBed } from '@angular/core/testing';

import { ListPublisherService } from './list-publisher.service';

describe('ListPublisherService', () => {
  let service: ListPublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
