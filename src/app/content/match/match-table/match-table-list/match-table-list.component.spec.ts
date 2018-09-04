import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTableListComponent } from './match-table-list.component';

describe('MatchTableListComponent', () => {
  let component: MatchTableListComponent;
  let fixture: ComponentFixture<MatchTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchTableListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
