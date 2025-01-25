import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementAddComponent } from './abonnement-add.component';

describe('AbonnementAddComponent', () => {
  let component: AbonnementAddComponent;
  let fixture: ComponentFixture<AbonnementAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbonnementAddComponent]
    });
    fixture = TestBed.createComponent(AbonnementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
