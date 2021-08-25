import { ComponentFixture, TestBed } from '@angular/core/testing';

import { maintenancePlansComponent } from './maintenance-plans.component';

describe('maintenancePlansComponent', () => {
  let component: maintenancePlansComponent;
  let fixture: ComponentFixture<maintenancePlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ maintenancePlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(maintenancePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
