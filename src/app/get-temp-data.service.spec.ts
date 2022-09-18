import { TestBed } from '@angular/core/testing';

import { GetTempDataService } from './get-temp-data.service';

describe('GetTempDataService', () => {
  let service: GetTempDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTempDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
