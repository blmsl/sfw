import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditStartingElevenComponent } from './match-edit-starting-eleven.component';

describe('MatchEditStartingElevenComponent', () => {
  let component: MatchEditStartingElevenComponent;
  let fixture: ComponentFixture<MatchEditStartingElevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchEditStartingElevenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditStartingElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
