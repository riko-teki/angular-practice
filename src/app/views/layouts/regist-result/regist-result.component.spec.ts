import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistResultComponent } from './regist-result.component';

describe('RegistResultComponent', () => {
  let component: RegistResultComponent;
  let fixture: ComponentFixture<RegistResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
