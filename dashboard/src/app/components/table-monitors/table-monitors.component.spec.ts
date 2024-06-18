import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMonitorsComponent } from './table-monitors.component';

describe('TableMonitorsComponent', () => {
  let component: TableMonitorsComponent;
  let fixture: ComponentFixture<TableMonitorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableMonitorsComponent]
    });
    fixture = TestBed.createComponent(TableMonitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
