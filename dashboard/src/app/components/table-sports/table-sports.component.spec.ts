import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSportsComponent } from './table-sports.component';

describe('TableSportsComponent', () => {
  let component: TableSportsComponent;
  let fixture: ComponentFixture<TableSportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSportsComponent]
    });
    fixture = TestBed.createComponent(TableSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
