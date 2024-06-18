import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportEditComponent } from './sport-edit.component';

describe('SportEditComponent', () => {
  let component: SportEditComponent;
  let fixture: ComponentFixture<SportEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportEditComponent]
    });
    fixture = TestBed.createComponent(SportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
