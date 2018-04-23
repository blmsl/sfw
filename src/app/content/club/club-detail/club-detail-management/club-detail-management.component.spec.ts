import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailManagementComponent } from './club-detail-management.component';

describe('ClubDetailManagementComponent', () => {
  let component: ClubDetailManagementComponent;
  let fixture: ComponentFixture<ClubDetailManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
