import { TestBed } from '@angular/core/testing';

import { EntregablesService } from './entregables.service';

describe('EntregablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntregablesService = TestBed.get(EntregablesService);
    expect(service).toBeTruthy();
  });
});
