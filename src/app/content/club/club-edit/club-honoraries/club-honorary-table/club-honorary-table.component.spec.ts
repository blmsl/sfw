import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubHonoraryTableComponent } from './club-honorary-table.component';

describe('ClubHonoraryTableComponent', () => {
  let component: ClubHonoraryTableComponent;
  let fixture: ComponentFixture<ClubHonoraryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubHonoraryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubHonoraryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
