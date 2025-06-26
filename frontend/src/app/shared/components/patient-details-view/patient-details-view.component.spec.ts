import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsViewComponent } from './patient-details-view.component';

describe('PatientDetailsViewComponent', () => {
  let component: PatientDetailsViewComponent;
  let fixture: ComponentFixture<PatientDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
