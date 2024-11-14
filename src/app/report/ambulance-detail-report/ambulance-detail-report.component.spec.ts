import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceDetailReportComponent } from './ambulance-detail-report.component';

describe('AmbulanceDetailReportComponent', () => {
  let component: AmbulanceDetailReportComponent;
  let fixture: ComponentFixture<AmbulanceDetailReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceDetailReportComponent]
    });
    fixture = TestBed.createComponent(AmbulanceDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
