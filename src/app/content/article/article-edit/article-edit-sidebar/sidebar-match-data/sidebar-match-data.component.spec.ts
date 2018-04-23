import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMatchDataComponent } from './sidebar-match-data.component';

describe('SidebarMatchDataComponent', () => {
  let component: SidebarMatchDataComponent;
  let fixture: ComponentFixture<SidebarMatchDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMatchDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMatchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
