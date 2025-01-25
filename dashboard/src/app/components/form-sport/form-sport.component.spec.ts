import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSportComponent } from './form-sport.component';

describe('FormSportComponent', () => {
  let component: FormSportComponent;
  let fixture: ComponentFixture<FormSportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSportComponent]
    });
    fixture = TestBed.createComponent(FormSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
