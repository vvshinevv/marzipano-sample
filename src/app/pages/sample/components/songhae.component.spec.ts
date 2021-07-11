import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonghaeComponent } from './songhae.component';

describe('SonghaeComponent', () => {
  let component: SonghaeComponent;
  let fixture: ComponentFixture<SonghaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonghaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonghaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
