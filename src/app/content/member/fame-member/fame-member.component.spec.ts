import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FameMemberComponent } from './fame-member.component';

describe('FameMemberComponent', () => {
  let component: FameMemberComponent;
  let fixture: ComponentFixture<FameMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FameMemberComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FameMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
