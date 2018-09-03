import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditSubstitutionsComponent } from './match-edit-substitutions.component';

describe('MatchEditSubstitutionsComponent', () => {
  let component: MatchEditSubstitutionsComponent;
  let fixture: ComponentFixture<MatchEditSubstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEditSubstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditSubstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
