import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPayementComponent } from './form-payement.component';

describe('FormPayementComponent', () => {
  let component: FormPayementComponent;
  let fixture: ComponentFixture<FormPayementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPayementComponent]
    });
    fixture = TestBed.createComponent(FormPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
