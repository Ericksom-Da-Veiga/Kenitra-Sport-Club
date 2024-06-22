import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementInformationsComponent } from './abonnement-informations.component';

describe('AbonnementInformationsComponent', () => {
  let component: AbonnementInformationsComponent;
  let fixture: ComponentFixture<AbonnementInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbonnementInformationsComponent]
    });
    fixture = TestBed.createComponent(AbonnementInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
