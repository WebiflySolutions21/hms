import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalConfigDetailsComponent } from './hospital-config-details.component';

describe('HospitalConfigDetailsComponent', () => {
  let component: HospitalConfigDetailsComponent;
  let fixture: ComponentFixture<HospitalConfigDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalConfigDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
