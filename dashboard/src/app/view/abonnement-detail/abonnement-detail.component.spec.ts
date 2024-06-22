import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementDetailComponent } from './abonnement-detail.component';

describe('AbonnementDetailComponent', () => {
  let component: AbonnementDetailComponent;
  let fixture: ComponentFixture<AbonnementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbonnementDetailComponent]
    });
    fixture = TestBed.createComponent(AbonnementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
