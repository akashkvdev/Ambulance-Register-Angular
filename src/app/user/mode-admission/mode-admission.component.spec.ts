import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeAdmissionComponent } from './mode-admission.component';

describe('ModeAdmissionComponent', () => {
  let component: ModeAdmissionComponent;
  let fixture: ComponentFixture<ModeAdmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeAdmissionComponent]
    });
    fixture = TestBed.createComponent(ModeAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
