import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailMainComponent } from './member-detail-main.component';

describe('MemberDetailMainComponent', () => {
  let component: MemberDetailMainComponent;
  let fixture: ComponentFixture<MemberDetailMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
