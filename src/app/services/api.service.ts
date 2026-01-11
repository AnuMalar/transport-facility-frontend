import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private snackBar = inject(MatSnackBar);
  apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  showSnackBar(message: any, color: any) {
    this.snackBar.open(message, 'okay', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
      panelClass: [color]
    })
  }

  formatTime(time: string): string {
    if (!time) return '';

    const [hourStr, minute] = time.split(':');
    let hour = Number(hourStr);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;

    return `${hour}:${minute} ${ampm}`;
  }

  addRide(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + '/addRide', payload);
  }

  getAllRides(): Observable<any> {
    return this.http.get(this.apiUrl + '/getRides');
  }

  checkRideExist(obj: any): Observable<any> {
    return this.http.post(this.apiUrl + '/checkExist', obj);
  }

  searchRide(obj: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', obj);
  }

  bookRide(obj: any): Observable<any> {
    return this.http.post(this.apiUrl + '/bookRide', obj);
  }

}
