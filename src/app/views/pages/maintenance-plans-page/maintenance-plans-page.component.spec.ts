import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePlansPageComponent } from './maintenance-plans-page.component';

describe('MaintenancePlansPageComponent', () => {
  let component: MaintenancePlansPageComponent;
  let fixture: ComponentFixture<MaintenancePlansPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenancePlansPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePlansPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
