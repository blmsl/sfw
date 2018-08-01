import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditMainComponent } from './match-edit-main.component';

describe('MatchEditMainComponent', () => {
  let component: MatchEditMainComponent;
  let fixture: ComponentFixture<MatchEditMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEditMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
