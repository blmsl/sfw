import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditResultComponent } from './match-edit-result.component';

describe('MatchEditResultComponent', () => {
  let component: MatchEditResultComponent;
  let fixture: ComponentFixture<MatchEditResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchEditResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
