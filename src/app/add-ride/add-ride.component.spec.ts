import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddRideComponent } from './add-ride.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddRideComponent', () => {
  let component: AddRideComponent;
  let fixture: ComponentFixture<AddRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRideComponent, ReactiveFormsModule, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.rideForm.valid).toBeFalse();
  })

  it('form should be valid when all required fields are filled', () => {
    component.rideForm.setValue({
      employeeId: 'EMP01',
      vehicleType: 'Car',
      vehicleNo: 'TN01AB12',
      vacantSeats: 2,
      time: '10:30',
      pickupPoint: 'Gandhipuram',
      destination: 'Tidel Park'
    });

    expect(component.rideForm.valid).toBeTrue();
  });
});
