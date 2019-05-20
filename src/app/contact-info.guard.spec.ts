import { TestBed, async, inject } from '@angular/core/testing';

import { ContactInfoGuard } from './contact-info.guard';

describe('ContactInfoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactInfoGuard]
    });
  });

  it('should ...', inject([ContactInfoGuard], (guard: ContactInfoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
