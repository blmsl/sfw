import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailManagementPositionsComponent } from './club-detail-management-positions.component';

describe('ClubDetailManagementPositionsComponent', () => {
  let component: ClubDetailManagementPositionsComponent;
  let fixture: ComponentFixture<ClubDetailManagementPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubDetailManagementPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailManagementPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
