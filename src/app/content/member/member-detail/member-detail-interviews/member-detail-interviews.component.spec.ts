import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailInterviewsComponent } from './member-detail-interviews.component';

describe('MemberDetailInterviewsComponent', () => {
  let component: MemberDetailInterviewsComponent;
  let fixture: ComponentFixture<MemberDetailInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailInterviewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
