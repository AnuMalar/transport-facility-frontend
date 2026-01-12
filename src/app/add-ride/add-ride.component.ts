import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ride',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatSelectModule, MatRadioModule, MatIconModule],
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css', '/src/common.css']
})

export class AddRideComponent implements OnInit {

  rideForm !: FormGroup;
  empId: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.empId = localStorage.getItem('employeeId') || '';
  }

  ngOnInit(): void {
    this.rideForm = this.fb.group({
      employeeId: [{ value: this.empId, disabled: true }, [Validators.required]],
      vehicleType: ['', [Validators.required]],
      vehicleNo: ['', [Validators.required]],
      vacantSeats: ['', [Validators.required]],
      time: ['', [Validators.required]],
      pickupPoint: ['', Validators.required],
      destination: ['', Validators.required]
    })

    this.rideForm.get('vehicleType')?.valueChanges.subscribe(type => {
      if (type === 'Car') {
        this.rideForm.get('vacantSeats')?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        this.rideForm.get('vacantSeats')?.clearValidators();
        this.rideForm.get('vacantSeats')?.setValue(1);
      }
      this.rideForm.get('vacantSeats')?.updateValueAndValidity();
    });
  }

  // submit the form to add a ride for today
  onSubmit() {
    this.apiService.addRide(this.rideForm.getRawValue()).subscribe((res: any) => {
      if (res.statusCode == 201) {
        this.apiService.showSnackBar(res.message, ['success']);
        this.rideForm.reset();
        this.router.navigate(['/home']);
      }
    })
  }

  // back to home page
  backTo() {
    this.router.navigate(['/home']);
  }

}
