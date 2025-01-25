import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAddComponent } from './settings-add.component';

describe('SettingsAddComponent', () => {
  let component: SettingsAddComponent;
  let fixture: ComponentFixture<SettingsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsAddComponent]
    });
    fixture = TestBed.createComponent(SettingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
