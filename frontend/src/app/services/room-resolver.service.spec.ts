import { TestBed } from '@angular/core/testing';

import { RoomResolver } from './room-resolver.service';

describe('RoomResolverService', () => {
  let service: RoomResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
