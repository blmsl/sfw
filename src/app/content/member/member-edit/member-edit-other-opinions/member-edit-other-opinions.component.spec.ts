import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditOtherOpinionsComponent } from './member-edit-other-opinions.component';

describe('MemberEditOtherOpinionsComponent', () => {
  let component: MemberEditOtherOpinionsComponent;
  let fixture: ComponentFixture<MemberEditOtherOpinionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberEditOtherOpinionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditOtherOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
