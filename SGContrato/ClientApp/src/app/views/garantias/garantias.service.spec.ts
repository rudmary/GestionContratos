import { TestBed } from '@angular/core/testing';

import { GarantiasService } from './garantias.service';

describe('GarantiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GarantiasService = TestBed.get(GarantiasService);
    expect(service).toBeTruthy();
  });
});
