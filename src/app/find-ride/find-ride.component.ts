import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { rideMetadata } from '../shared/const';
import { MatButton } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-find-ride',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatButton, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './find-ride.component.html',
  styleUrls: ['./find-ride.component.css', '/src/common.css']
})

export class FindRideComponent implements OnInit {

  ridesList: any = [];
  rideMeta: any = rideMetadata;
  employeeId: any;
  vType: any = ['All', 'Bike', 'Car'];
  isLoading: boolean = false;
  isSearch: boolean = false;
  rideObj: any = {
    time: '',
    vehicleType: 'All'
  };

  constructor(private router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem('employeeId') || '';
    this.rideObj['empId'] = this.employeeId;
  }

  // get available rides for today
  getRidesForToday() {
    this.isLoading = true;
    this.apiService.getAllRides().subscribe((res: any) => {
      if (res.statusCode == 200 && res.info && res.info.length) {
        this.ridesList = res.info;
        this.isLoading = false;
      } else {
        this.ridesList = [];
        this.isLoading = false;
      }
    })
  }

  // apply a filter to search a ride
  searchRide() {
    if (this.rideObj && Object.values(this.rideObj).every(
      value => value !== null && value !== undefined && value !== ''
    )) {
      this.isLoading = true;
      this.isSearch = true;
      this.apiService.searchRide(this.rideObj).subscribe((res: any) => {
        if (res.statusCode == 200 && res.info && res.info.length) {
          this.ridesList = res.info;
          this.isLoading = false;
        } else {
          this.ridesList = [];
          this.isLoading = false;
        }
      })
    } else {
      window.alert("Please fill all the required fields")
    }
  }

  // book the selected ride
  bookRide(id: any) {
    let payload = {
      rideId: id,
      empId: this.employeeId
    }
    this.isLoading = true;
    this.apiService.bookRide(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.apiService.showSnackBar(res.message, ['success']);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.ridesList = [];
        this.apiService.showSnackBar(res.message, ['warning']);
      }
    })
  }

  // back to home page
  backTo() {
    this.router.navigate(['/home']);
  }
}