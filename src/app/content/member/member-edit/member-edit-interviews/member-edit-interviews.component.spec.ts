import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditInterviewsComponent } from './member-edit-interviews.component';

describe('MemberEditInterviewsComponent', () => {
  let component: MemberEditInterviewsComponent;
  let fixture: ComponentFixture<MemberEditInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberEditInterviewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
