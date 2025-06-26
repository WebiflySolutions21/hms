import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpthalComponent } from './opthal.component';

describe('OpthalComponent', () => {
  let component: OpthalComponent;
  let fixture: ComponentFixture<OpthalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpthalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpthalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
