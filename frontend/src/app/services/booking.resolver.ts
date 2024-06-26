import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "../models/booking";
import { BookingService } from "./booking.service";

@Injectable({
  providedIn: 'root'
})
export class BookingResolver implements Resolve<Booking[]> {

  constructor(private bookingService: BookingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Booking[]> {
    return this.bookingService.getUserBookings();
  }
}

