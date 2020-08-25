import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTextComponent } from './update-text.component';

describe('UpdateTextComponent', () => {
  let component: UpdateTextComponent;
  let fixture: ComponentFixture<UpdateTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
