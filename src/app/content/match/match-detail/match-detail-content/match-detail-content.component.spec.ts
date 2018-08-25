import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailContentComponent } from './match-detail-content.component';

describe('MatchDetailContentComponent', () => {
  let component: MatchDetailContentComponent;
  let fixture: ComponentFixture<MatchDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
