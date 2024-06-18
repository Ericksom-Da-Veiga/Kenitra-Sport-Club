import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAbonnementComponent } from './form-abonnement.component';

describe('FormAbonnementComponent', () => {
  let component: FormAbonnementComponent;
  let fixture: ComponentFixture<FormAbonnementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAbonnementComponent]
    });
    fixture = TestBed.createComponent(FormAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
