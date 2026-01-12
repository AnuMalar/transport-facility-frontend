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
  // isRideExist: boolean = false;
  rideObj: any = {
    time: '',
    vehicleType: 'All'
  };

  constructor(private router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    // this.getRidesForToday();
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
  }

  // check if the ride is picked by the already booked employee or not
  // checkExist() {
  //   let payload: any = { empId: this.employeeId, today: new Date().toISOString().split('T')[0] }
  //   this.apiService.checkRideExist(payload).subscribe((res: any) => {
  //     if (res.statusCode == 200) {
  //       res.exists == true ? this.apiService.showSnackBar('You have already added a ride for today', ['error']) : '';
  //       return res.exists == true ? true : false;
  //     } else {
  //       return false;
  //     }
  //   })
  //   return false;
  // }


  // book the selected ride
  bookRide(id: any) {
    let payload = {
      rideId: id,
      empId: this.employeeId
    }
    this.apiService.bookRide(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.apiService.showSnackBar(res.message, ['success']);
        this.getRidesForToday();
      } else {
        this.apiService.showSnackBar(res.message, ['warning']);
      }
    })
  }

  // back to home page
  backTo() {
    this.router.navigate(['/home']);
  }
}