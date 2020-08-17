import { TestBed } from '@angular/core/testing';

import { DeleteUpdateNewsService } from './delete-update-news.service';

describe('DeleteNewsService', () => {
  let service: DeleteUpdateNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUpdateNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
