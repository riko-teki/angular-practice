import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistResultPageComponent } from './regist-result-page.component';

describe('RegistResultPageComponent', () => {
  let component: RegistResultPageComponent;
  let fixture: ComponentFixture<RegistResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistResultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
