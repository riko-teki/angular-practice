import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceGroupDetailComponent } from './maintenance-group-detail.component';

describe('MaintenanceGroupDetailComponent', () => {
  let component: MaintenanceGroupDetailComponent;
  let fixture: ComponentFixture<MaintenanceGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceGroupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
