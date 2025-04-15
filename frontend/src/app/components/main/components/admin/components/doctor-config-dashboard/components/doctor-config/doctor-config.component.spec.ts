import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConfigComponent } from './doctor-config.component';

describe('DoctorConfigComponent', () => {
  let component: DoctorConfigComponent;
  let fixture: ComponentFixture<DoctorConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
