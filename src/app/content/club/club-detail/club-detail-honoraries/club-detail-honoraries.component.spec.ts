import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailHonorariesComponent } from './club-detail-honoraries.component';

describe('ClubDetailHonorariesComponent', () => {
  let component: ClubDetailHonorariesComponent;
  let fixture: ComponentFixture<ClubDetailHonorariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailHonorariesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailHonorariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
