import { TestBed } from '@angular/core/testing';

import { HeroFireService } from './hero-fire.service';

describe('HeroFireService', () => {
  let service: HeroFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
