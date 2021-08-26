import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDatailPageComponent } from './maintenance-datail-page.component';

describe('MaintenanceDatailPageComponent', () => {
  let component: MaintenanceDatailPageComponent;
  let fixture: ComponentFixture<MaintenanceDatailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceDatailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceDatailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
