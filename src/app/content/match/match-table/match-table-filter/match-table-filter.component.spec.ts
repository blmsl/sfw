import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTableFilterComponent } from './match-table-filter.component';

describe('MatchTableFilterComponent', () => {
  let component: MatchTableFilterComponent;
  let fixture: ComponentFixture<MatchTableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchTableFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
