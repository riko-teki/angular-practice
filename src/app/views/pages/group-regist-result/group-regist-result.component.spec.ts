import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegistResultComponent } from './group-regist-result.component';

describe('GroupRegistResultComponent', () => {
  let component: GroupRegistResultComponent;
  let fixture: ComponentFixture<GroupRegistResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupRegistResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRegistResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
