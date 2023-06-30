import { TestBed } from '@angular/core/testing';

import { DlimatgeService } from './dlimatge.service';

describe('DlimatgeService', () => {
  let service: DlimatgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DlimatgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
