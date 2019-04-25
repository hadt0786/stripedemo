import { TestBed } from '@angular/core/testing';

import { StripeServiceService } from './stripe-service.service';

describe('StripeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StripeServiceService = TestBed.get(StripeServiceService);
    expect(service).toBeTruthy();
  });
});
