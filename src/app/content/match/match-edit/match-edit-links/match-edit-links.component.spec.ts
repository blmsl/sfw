import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditLinksComponent } from './match-edit-links.component';

describe('MatchEditLinksComponent', () => {
  let component: MatchEditLinksComponent;
  let fixture: ComponentFixture<MatchEditLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEditLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
