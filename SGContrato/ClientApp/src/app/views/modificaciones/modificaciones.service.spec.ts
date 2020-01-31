import { TestBed } from '@angular/core/testing';

import { ModificacionesService } from './modificaciones.service';

describe('ModificacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModificacionesService = TestBed.get(ModificacionesService);
    expect(service).toBeTruthy();
  });
});
