import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditFormationComponent } from './match-edit-formation.component';

describe('MatchEditFormationComponent', () => {
  let component: MatchEditFormationComponent;
  let fixture: ComponentFixture<MatchEditFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchEditFormationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
