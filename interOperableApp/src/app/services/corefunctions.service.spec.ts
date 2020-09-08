import { TestBed } from '@angular/core/testing';

import { CorefunctionsService } from './corefunctions.service';

describe('CorefunctionsService', () => {
  let service: CorefunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorefunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
