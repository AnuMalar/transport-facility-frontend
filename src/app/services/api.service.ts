import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private snackBar = inject(MatSnackBar);
  apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  // show snackbar on the top of the page
  showSnackBar(message: any, color: any) {
    this.snackBar.open(message, 'okay', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
      panelClass: [color]
    })
  }

  // convert time 24 hrs to 12 hrs
  formatTime(time: string): string {
    if (!time) return '';
    const [hourStr, minute] = time.split(':');
    let hour = Number(hourStr);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;
    return `${hour}:${minute} ${ampm}`;
  }

  //add ride api
  addRide(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + '/addRide', payload);
  }

  //get all rides api
  getAllRides(): Observable<any> {
    const currentTime = new Date().toTimeString().slice(0, 5);
    const params = new HttpParams().set('currentTime', currentTime);
    return this.http.get(this.apiUrl + '/getRides', { params });
  }

  // check if ride exist or not
  checkRideExist(obj: any): Observable<any> {
    return this.http.post(this.apiUrl + '/checkExist', obj);
  }

  // search a ride based on criteria
  searchRide(obj: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', obj);
  }

  // book a ride for today
  bookRide(obj: any): Observable<any> {
    return this.http.post(this.apiUrl + '/bookRide', obj);
  }

}
