import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFieldSquareComponent } from './match-field-square.component';

describe('MatchFieldSquareComponent', () => {
  let component: MatchFieldSquareComponent;
  let fixture: ComponentFixture<MatchFieldSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchFieldSquareComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFieldSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
