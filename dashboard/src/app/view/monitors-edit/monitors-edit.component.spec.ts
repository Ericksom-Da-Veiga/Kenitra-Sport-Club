import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsEditComponent } from './monitors-edit.component';

describe('MonitorsEditComponent', () => {
  let component: MonitorsEditComponent;
  let fixture: ComponentFixture<MonitorsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorsEditComponent]
    });
    fixture = TestBed.createComponent(MonitorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
