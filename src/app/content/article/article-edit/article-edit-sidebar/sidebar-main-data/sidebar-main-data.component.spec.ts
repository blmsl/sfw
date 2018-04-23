import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMainDataComponent } from './sidebar-main-data.component';

describe('SidebarMainDataComponent', () => {
  let component: SidebarMainDataComponent;
  let fixture: ComponentFixture<SidebarMainDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMainDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
