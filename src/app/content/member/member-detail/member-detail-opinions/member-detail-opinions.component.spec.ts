import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailOpinionsComponent } from './member-detail-opinions.component';

describe('MemberDetailOpinionsComponent', () => {
  let component: MemberDetailOpinionsComponent;
  let fixture: ComponentFixture<MemberDetailOpinionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailOpinionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
