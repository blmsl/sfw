import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeleteGuard } from './can-delete.guard';

describe('CanDeleteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeleteGuard]
    });
  });

  it('should ...', inject([CanDeleteGuard], (guard: CanDeleteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
