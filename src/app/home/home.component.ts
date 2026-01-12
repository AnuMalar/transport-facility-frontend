import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { rideMetadata } from '../shared/const';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSelectModule, MatButtonModule, FormsModule, MatIconModule, CommonModule, MatProgressSpinner],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '/src/common.css']
})

export class HomeComponent implements OnInit {

  today: any = new Date();
  selectedRole: any = 'All';
  employeeId: any;
  ridesList: any = [];
  rideMeta: any = rideMetadata;
  isLoading: boolean = false;
  vType: any = ['All', 'Bike', 'Car'];

  constructor(private router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.getRidesForToday();
  }

  //add a new ride
  addRide() {
    if (!!this.employeeId) {
      localStorage.setItem('employeeId', this.employeeId);
      this.router.navigate(['/ride']);
    } else {
      window.alert("Employee ID is mandatory")
    }
  }

  // find a ride for today
  findRide() {
    if (!!this.employeeId) {
      localStorage.setItem('employeeId', this.employeeId);
      this.router.navigate(['/find-ride']);
    } else {
      window.alert("Employee ID is mandatory")
    }
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

  searchRide() {
    this.isLoading = true;
    this.apiService.searchRide({ vehicleType: this.selectedRole }).subscribe((res: any) => {
      if (res.statusCode == 200 && res.info && res.info.length) {
        this.ridesList = res.info;
        this.isLoading = false;
      } else {
        this.ridesList = [];
        this.isLoading = false;
      }
    })
  }

}
