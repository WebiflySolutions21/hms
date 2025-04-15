import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConfigDashboardComponent } from './doctor-config-dashboard.component';

describe('DoctorConfigDashboardComponent', () => {
  let component: DoctorConfigDashboardComponent;
  let fixture: ComponentFixture<DoctorConfigDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorConfigDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorConfigDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
