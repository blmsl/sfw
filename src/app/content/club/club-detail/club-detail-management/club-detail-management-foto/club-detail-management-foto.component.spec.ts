import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailManagementFotoComponent } from './club-detail-management-foto.component';

describe('ClubDetailManagementFotoComponent', () => {
  let component: ClubDetailManagementFotoComponent;
  let fixture: ComponentFixture<ClubDetailManagementFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailManagementFotoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailManagementFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
