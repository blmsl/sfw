import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubHonorariesComponent } from './club-honoraries.component';

describe('ClubHonorariesComponent', () => {
  let component: ClubHonorariesComponent;
  let fixture: ComponentFixture<ClubHonorariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubHonorariesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubHonorariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
