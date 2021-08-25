import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceGroupComponent } from './maintenance-group.component';

describe('MaintenanceGroupComponent', () => {
  let component: MaintenanceGroupComponent;
  let fixture: ComponentFixture<MaintenanceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
