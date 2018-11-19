import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditMediaComponent } from './match-edit-media.component';

describe('MatchEditMediaComponent', () => {
  let component: MatchEditMediaComponent;
  let fixture: ComponentFixture<MatchEditMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEditMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
