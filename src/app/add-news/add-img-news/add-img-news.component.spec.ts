import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImgNewsComponent } from './add-img-news.component';

describe('AddImgNewsComponent', () => {
  let component: AddImgNewsComponent;
  let fixture: ComponentFixture<AddImgNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImgNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImgNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
