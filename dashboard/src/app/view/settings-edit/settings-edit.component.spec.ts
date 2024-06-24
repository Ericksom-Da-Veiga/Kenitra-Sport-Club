import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditComponent } from './settings-edit.component';

describe('SettingsEditComponent', () => {
  let component: SettingsEditComponent;
  let fixture: ComponentFixture<SettingsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsEditComponent]
    });
    fixture = TestBed.createComponent(SettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
