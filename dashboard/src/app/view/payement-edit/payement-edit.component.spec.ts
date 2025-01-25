import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementEditComponent } from './payement-edit.component';

describe('PayementEditComponent', () => {
  let component: PayementEditComponent;
  let fixture: ComponentFixture<PayementEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayementEditComponent]
    });
    fixture = TestBed.createComponent(PayementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
