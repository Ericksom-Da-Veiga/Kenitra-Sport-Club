import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdherantComponent } from './form-adherant.component';

describe('FormAdherantComponent', () => {
  let component: FormAdherantComponent;
  let fixture: ComponentFixture<FormAdherantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAdherantComponent]
    });
    fixture = TestBed.createComponent(FormAdherantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
