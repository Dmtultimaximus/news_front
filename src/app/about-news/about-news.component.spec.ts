import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutNewsComponent } from './about-news.component';

describe('AboutNewsComponent', () => {
  let component: AboutNewsComponent;
  let fixture: ComponentFixture<AboutNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
