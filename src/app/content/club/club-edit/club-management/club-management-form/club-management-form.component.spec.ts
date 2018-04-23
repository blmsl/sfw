import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubManagementFormComponent } from './club-management-form.component';

describe('ClubManagementFormComponent', () => {
  let component: ClubManagementFormComponent;
  let fixture: ComponentFixture<ClubManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubManagementFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
