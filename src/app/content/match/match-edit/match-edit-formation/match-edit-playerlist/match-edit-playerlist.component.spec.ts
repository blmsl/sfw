import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditPlayerlistComponent } from './match-edit-playerlist.component';

describe('MatchEditPlayerlistComponent', () => {
  let component: MatchEditPlayerlistComponent;
  let fixture: ComponentFixture<MatchEditPlayerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEditPlayerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditPlayerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
