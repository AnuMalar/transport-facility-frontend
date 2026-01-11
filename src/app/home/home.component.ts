import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSelectModule, MatButtonModule, FormsModule, MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '/src/common.css']
})

export class HomeComponent {

  today: any = new Date();
  selectedRole: any = '';
  employeeId: any;

  constructor(private router: Router) { }

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

}
