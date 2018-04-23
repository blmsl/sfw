import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubManagementComponent } from './club-management.component';

describe('ClubManagementComponent', () => {
  let component: ClubManagementComponent;
  let fixture: ComponentFixture<ClubManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
