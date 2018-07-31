import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FameMemberEntryComponent } from './fame-member-entry.component';

describe('FameMemberEntryComponent', () => {
  let component: FameMemberEntryComponent;
  let fixture: ComponentFixture<FameMemberEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FameMemberEntryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FameMemberEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
