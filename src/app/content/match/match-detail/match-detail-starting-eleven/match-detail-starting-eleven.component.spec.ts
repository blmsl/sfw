import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailStartingElevenComponent } from './match-detail-starting-eleven.component';

describe('MatchDetailStartingElevenComponent', () => {
  let component: MatchDetailStartingElevenComponent;
  let fixture: ComponentFixture<MatchDetailStartingElevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchDetailStartingElevenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailStartingElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
