import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentComponent } from './shift-assignment.component';

describe('ShiftAssignmentComponent', () => {
  let component: ShiftAssignmentComponent;
  let fixture: ComponentFixture<ShiftAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftAssignmentComponent]
    });
    fixture = TestBed.createComponent(ShiftAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
