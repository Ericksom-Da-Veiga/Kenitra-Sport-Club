import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdherantsComponent } from './table-adherants.component';

describe('TableAdherantsComponent', () => {
  let component: TableAdherantsComponent;
  let fixture: ComponentFixture<TableAdherantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAdherantsComponent]
    });
    fixture = TestBed.createComponent(TableAdherantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
