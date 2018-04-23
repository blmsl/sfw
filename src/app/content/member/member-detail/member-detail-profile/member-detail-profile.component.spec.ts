import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailProfileComponent } from './member-detail-profile.component';

describe('MemberDetailProfileComponent', () => {
  let component: MemberDetailProfileComponent;
  let fixture: ComponentFixture<MemberDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
