import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayementComponent } from './edit-payement.component';

describe('EditPayementComponent', () => {
  let component: EditPayementComponent;
  let fixture: ComponentFixture<EditPayementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPayementComponent]
    });
    fixture = TestBed.createComponent(EditPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
