import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceRegisterComponent } from './ambulance-register.component';

describe('AmbulanceRegisterComponent', () => {
  let component: AmbulanceRegisterComponent;
  let fixture: ComponentFixture<AmbulanceRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceRegisterComponent]
    });
    fixture = TestBed.createComponent(AmbulanceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
