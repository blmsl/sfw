import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubEditMediaComponent } from './club-edit-media.component';

describe('ClubEditMediaComponent', () => {
  let component: ClubEditMediaComponent;
  let fixture: ComponentFixture<ClubEditMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubEditMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubEditMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
