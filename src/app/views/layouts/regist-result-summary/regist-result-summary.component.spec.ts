import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistResultSummaryComponent } from './regist-result-summary.component';

describe('RegistResultSummaryComponent', () => {
  let component: RegistResultSummaryComponent;
  let fixture: ComponentFixture<RegistResultSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistResultSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistResultSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
