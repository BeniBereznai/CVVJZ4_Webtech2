import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Booking } from "../models/booking";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  createBooking(booking: Booking): Observable<Booking> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No JWT token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Booking>(this.apiUrl, {booking: booking}, {headers});
  }

  getUserBookings(): Observable<Booking[]> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No JWT token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Booking[]>(this.apiUrl+"/view-bookings",{headers});
  }

}
