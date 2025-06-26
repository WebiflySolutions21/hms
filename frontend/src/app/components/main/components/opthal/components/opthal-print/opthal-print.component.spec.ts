import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpthalPrintComponent } from './opthal-print.component';

describe('OpthalPrintComponent', () => {
  let component: OpthalPrintComponent;
  let fixture: ComponentFixture<OpthalPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpthalPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpthalPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
