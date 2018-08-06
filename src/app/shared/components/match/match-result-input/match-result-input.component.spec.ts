import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultInputComponent } from './match-result-input.component';

describe('MatchResultInputComponent', () => {
  let component: MatchResultInputComponent;
  let fixture: ComponentFixture<MatchResultInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchResultInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchResultInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
