import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubMediaComponent } from './club-media.component';

describe('ClubMediaComponent', () => {
  let component: ClubMediaComponent;
  let fixture: ComponentFixture<ClubMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
