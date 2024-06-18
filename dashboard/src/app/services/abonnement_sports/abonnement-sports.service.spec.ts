import { TestBed } from '@angular/core/testing';

import { AbonnementSportsService } from './abonnement_sports.service';

describe('AbonnementSportsService', () => {
  let service: AbonnementSportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonnementSportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
