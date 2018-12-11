import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMediaComponent } from './member-media.component';

describe('MemberMediaComponent', () => {
  let component: MemberMediaComponent;
  let fixture: ComponentFixture<MemberMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
