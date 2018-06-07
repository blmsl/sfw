import { TestBed, async, inject } from '@angular/core/testing';

import { CanWriteGuard } from './can-write.guard';

describe('CanWriteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanWriteGuard]
    });
  });

  it('should ...', inject([CanWriteGuard], (guard: CanWriteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
