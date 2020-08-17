import { TestBed } from '@angular/core/testing';

import { AboutNewsService } from './about-news.service';

describe('AboutNewsService', () => {
  let service: AboutNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
