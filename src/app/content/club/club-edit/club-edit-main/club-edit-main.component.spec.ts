import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubEditMainComponent } from './club-edit-main.component';

describe('ClubEditMainComponent', () => {
  let component: ClubEditMainComponent;
  let fixture: ComponentFixture<ClubEditMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubEditMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
