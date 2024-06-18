import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherantEditComponent } from './adherant-edit.component';

describe('AdherantEditComponent', () => {
  let component: AdherantEditComponent;
  let fixture: ComponentFixture<AdherantEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdherantEditComponent]
    });
    fixture = TestBed.createComponent(AdherantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
