import { TestBed } from '@angular/core/testing';

import { RatingNewsService } from './rating-news.service';

describe('RatingNewsService', () => {
  let service: RatingNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
