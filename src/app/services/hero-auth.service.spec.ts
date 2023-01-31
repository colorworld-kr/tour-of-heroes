import { TestBed } from '@angular/core/testing';

import { HeroAuthService } from './hero-auth.service';

describe('HeroAuthService', () => {
  let service: HeroAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
