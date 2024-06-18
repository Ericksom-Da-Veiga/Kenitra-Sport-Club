import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsAddsComponent } from './monitors-adds.component';

describe('MonitorsAddsComponent', () => {
  let component: MonitorsAddsComponent;
  let fixture: ComponentFixture<MonitorsAddsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorsAddsComponent]
    });
    fixture = TestBed.createComponent(MonitorsAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
