import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubManagementListComponent } from './club-management-list.component';

describe('ClubManagementListComponent', () => {
  let component: ClubManagementListComponent;
  let fixture: ComponentFixture<ClubManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubManagementListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
