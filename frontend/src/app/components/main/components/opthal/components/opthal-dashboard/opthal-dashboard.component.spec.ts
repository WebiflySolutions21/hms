import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpthalDashboardComponent } from './opthal-dashboard.component';

describe('OpthalDashboardComponent', () => {
  let component: OpthalDashboardComponent;
  let fixture: ComponentFixture<OpthalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpthalDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpthalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
