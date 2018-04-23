import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FameTeamComponent } from './fame-team.component';

describe('FameTeamComponent', () => {
  let component: FameTeamComponent;
  let fixture: ComponentFixture<FameTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FameTeamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FameTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
