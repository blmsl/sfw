import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailMainComponent } from './club-detail-main.component';

describe('ClubDetailMainComponent', () => {
  let component: ClubDetailMainComponent;
  let fixture: ComponentFixture<ClubDetailMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
