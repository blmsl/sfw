import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditMainComponent } from './member-edit-main.component';

describe('MemberEditMainComponent', () => {
  let component: MemberEditMainComponent;
  let fixture: ComponentFixture<MemberEditMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberEditMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
