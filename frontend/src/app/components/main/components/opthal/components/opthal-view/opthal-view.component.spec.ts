import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpthalViewComponent } from './opthal-view.component';

describe('OpthalViewComponent', () => {
  let component: OpthalViewComponent;
  let fixture: ComponentFixture<OpthalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpthalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpthalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
