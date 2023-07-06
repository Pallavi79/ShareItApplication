import { TestBed } from '@angular/core/testing';

import { UpdatePostServiceService } from './update-post-service.service';

describe('UpdatePostServiceService', () => {
  let service: UpdatePostServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
