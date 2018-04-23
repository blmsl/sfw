import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailHistoryComponent } from './club-detail-history.component';

describe('ClubDetailHistoryComponent', () => {
  let component: ClubDetailHistoryComponent;
  let fixture: ComponentFixture<ClubDetailHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailHistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
