import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchNewComponent } from './hero-search-new.component';

describe('HeroSearchNewComponent', () => {
  let component: HeroSearchNewComponent;
  let fixture: ComponentFixture<HeroSearchNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSearchNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSearchNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
