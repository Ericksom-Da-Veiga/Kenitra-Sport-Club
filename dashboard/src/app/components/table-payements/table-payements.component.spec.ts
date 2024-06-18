import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePayementsComponent } from './table-payements.component';

describe('TablePayementsComponent', () => {
  let component: TablePayementsComponent;
  let fixture: ComponentFixture<TablePayementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePayementsComponent]
    });
    fixture = TestBed.createComponent(TablePayementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
