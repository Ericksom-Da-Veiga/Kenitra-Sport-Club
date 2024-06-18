import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherantAddComponent } from './adherant-add.component';

describe('AdherantAddComponent', () => {
  let component: AdherantAddComponent;
  let fixture: ComponentFixture<AdherantAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdherantAddComponent]
    });
    fixture = TestBed.createComponent(AdherantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
