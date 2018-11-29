import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonLinkComponent } from './season-link.component';

describe('SeasonLinkComponent', () => {
  let component: SeasonLinkComponent;
  let fixture: ComponentFixture<SeasonLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
