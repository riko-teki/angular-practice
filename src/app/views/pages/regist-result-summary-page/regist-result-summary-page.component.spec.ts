import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistResultSummaryPageComponent } from './regist-result-summary-page.component';

describe('RegistResultSummaryPageComponent', () => {
  let component: RegistResultSummaryPageComponent;
  let fixture: ComponentFixture<RegistResultSummaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistResultSummaryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistResultSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
