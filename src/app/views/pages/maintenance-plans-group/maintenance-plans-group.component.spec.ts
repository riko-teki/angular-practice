import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePlansGroupComponent } from './maintenance-plans-group.component';

describe('MaintenancePlansGroupComponent', () => {
  let component: MaintenancePlansGroupComponent;
  let fixture: ComponentFixture<MaintenancePlansGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenancePlansGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePlansGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
